package handlers

import (
	"net/http"
	"strconv"

	"project-exchange/internal/database"
	"project-exchange/internal/models"

	"github.com/gin-gonic/gin"
)

type UpdateUserRequest struct {
	Name   string `json:"name"`
	Skills string `json:"skills"`
	Bio    string `json:"bio"`
}

// @Summary Get user profile
// @Description Get user profile by ID
// @Tags users
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} models.UserResponse
// @Failure 404 {object} map[string]interface{}
// @Router /users/{id} [get]
func GetUser(c *gin.Context) {
	userID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var user models.User
	if err := database.GetDB().First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	userResponse := models.UserResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Skills:    user.Skills,
		Bio:       user.Bio,
		CreatedAt: user.CreatedAt,
	}

	c.JSON(http.StatusOK, userResponse)
}

// @Summary Update user profile
// @Description Update user profile (only owner can update)
// @Tags users
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Param user body UpdateUserRequest true "User update data"
// @Success 200 {object} models.UserResponse
// @Failure 400 {object} map[string]interface{}
// @Failure 403 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Router /users/{id} [put]
func UpdateUser(c *gin.Context) {
	userID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Check if the authenticated user is the same as the user being updated
	authUserID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if authUserID != uint(userID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own profile"})
		return
	}

	var req UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := database.GetDB().First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Update fields
	if req.Name != "" {
		user.Name = req.Name
	}
	user.Skills = req.Skills
	user.Bio = req.Bio

	if err := database.GetDB().Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	userResponse := models.UserResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Skills:    user.Skills,
		Bio:       user.Bio,
		CreatedAt: user.CreatedAt,
	}

	c.JSON(http.StatusOK, userResponse)
}
