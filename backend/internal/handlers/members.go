package handlers

import (
	"net/http"
	"strconv"

	"project-exchange/internal/database"
	"project-exchange/internal/models"

	"github.com/gin-gonic/gin"
)

// @Summary Apply to project
// @Description Apply to join a project
// @Tags members
// @Security BearerAuth
// @Param id path int true "Project ID"
// @Success 201 {object} models.ProjectMember
// @Failure 400 {object} map[string]interface{}
// @Failure 409 {object} map[string]interface{}
// @Router /projects/{id}/apply [post]
func ApplyToProject(c *gin.Context) {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Check if project exists
	var project models.Project
	if err := database.GetDB().First(&project, projectID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	// Check if user is not the owner
	if project.OwnerID == userID.(uint) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project owner cannot apply to their own project"})
		return
	}

	// Check if user already applied
	var existingMember models.ProjectMember
	if err := database.GetDB().Where("project_id = ? AND user_id = ?", projectID, userID).First(&existingMember).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "You have already applied to this project"})
		return
	}

	// Create application
	member := models.ProjectMember{
		ProjectID: uint(projectID),
		UserID:    userID.(uint),
		Status:    "pending",
	}

	if err := database.GetDB().Create(&member).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to apply to project"})
		return
	}

	// Load user data
	database.GetDB().Preload("User").First(&member, member.ID)

	c.JSON(http.StatusCreated, member)
}

// @Summary Accept member
// @Description Accept a member application (only project owner)
// @Tags members
// @Security BearerAuth
// @Param id path int true "Project ID"
// @Param userId path int true "User ID"
// @Success 200 {object} models.ProjectMember
// @Failure 400 {object} map[string]interface{}
// @Failure 403 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Router /projects/{id}/accept/{userId} [post]
func AcceptMember(c *gin.Context) {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	userIDToAccept, err := strconv.ParseUint(c.Param("userId"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	ownerID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Check if project exists and user is owner
	var project models.Project
	if err := database.GetDB().First(&project, projectID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	if project.OwnerID != ownerID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only project owner can accept members"})
		return
	}

	// Find the member application
	var member models.ProjectMember
	if err := database.GetDB().Where("project_id = ? AND user_id = ?", projectID, userIDToAccept).First(&member).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Member application not found"})
		return
	}

	// Update status to accepted
	member.Status = "accepted"
	if err := database.GetDB().Save(&member).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to accept member"})
		return
	}

	// Load user data
	database.GetDB().Preload("User").First(&member, member.ID)

	c.JSON(http.StatusOK, member)
}
