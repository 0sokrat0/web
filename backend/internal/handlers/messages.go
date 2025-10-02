package handlers

import (
	"net/http"
	"strconv"

	"project-exchange/internal/database"
	"project-exchange/internal/models"

	"github.com/gin-gonic/gin"
)

type CreateMessageRequest struct {
	Content string `json:"content" binding:"required"`
}

// @Summary Get project messages
// @Description Get all messages for a project
// @Tags messages
// @Security BearerAuth
// @Param id path int true "Project ID"
// @Success 200 {array} models.Message
// @Failure 403 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Router /projects/{id}/messages [get]
func GetProjectMessages(c *gin.Context) {
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

	// Check if user is owner or accepted member
	if project.OwnerID != userID.(uint) {
		var member models.ProjectMember
		if err := database.GetDB().Where("project_id = ? AND user_id = ? AND status = ?", projectID, userID, "accepted").First(&member).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "You must be project owner or accepted member to view messages"})
			return
		}
	}

	var messages []models.Message
	if err := database.GetDB().
		Where("project_id = ?", projectID).
		Preload("User").
		Order("created_at asc").
		Find(&messages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch messages"})
		return
	}

	c.JSON(http.StatusOK, messages)
}

// @Summary Send message
// @Description Send a message to project chat
// @Tags messages
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path int true "Project ID"
// @Param message body CreateMessageRequest true "Message content"
// @Success 201 {object} models.Message
// @Failure 400 {object} map[string]interface{}
// @Failure 403 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Router /projects/{id}/messages [post]
func SendMessage(c *gin.Context) {
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

	var req CreateMessageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if project exists
	var project models.Project
	if err := database.GetDB().First(&project, projectID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	// Check if user is owner or accepted member
	if project.OwnerID != userID.(uint) {
		var member models.ProjectMember
		if err := database.GetDB().Where("project_id = ? AND user_id = ? AND status = ?", projectID, userID, "accepted").First(&member).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "You must be project owner or accepted member to send messages"})
			return
		}
	}

	// Create message
	message := models.Message{
		ProjectID: uint(projectID),
		UserID:    userID.(uint),
		Content:   req.Content,
	}

	if err := database.GetDB().Create(&message).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send message"})
		return
	}

	// Load user data
	database.GetDB().Preload("User").First(&message, message.ID)

	c.JSON(http.StatusCreated, message)
}
