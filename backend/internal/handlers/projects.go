package handlers

import (
	"net/http"
	"strconv"

	"project-exchange/internal/database"
	"project-exchange/internal/models"

	"github.com/gin-gonic/gin"
)

type CreateProjectRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Level       string `json:"level"` // beginner/middle/expert
}

type UpdateProjectRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Level       string `json:"level"`
}

// @Summary Create project
// @Description Create a new project
// @Tags projects
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param project body CreateProjectRequest true "Project data"
// @Success 201 {object} models.Project
// @Failure 400 {object} map[string]interface{}
// @Failure 401 {object} map[string]interface{}
// @Router /projects [post]
func CreateProject(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var req CreateProjectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	project := models.Project{
		OwnerID:     userID.(uint),
		Title:       req.Title,
		Description: req.Description,
		Category:    req.Category,
		Level:       req.Level,
	}

	if err := database.GetDB().Create(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
		return
	}

	// Load the owner data
	database.GetDB().Preload("Owner").First(&project, project.ID)

	c.JSON(http.StatusCreated, project)
}

// @Summary Get projects
// @Description Get list of projects with optional filtering
// @Tags projects
// @Produce json
// @Param category query string false "Filter by category"
// @Param level query string false "Filter by level"
// @Success 200 {array} models.Project
// @Router /projects [get]
func GetProjects(c *gin.Context) {
	var projects []models.Project
	query := database.GetDB().Preload("Owner")

	// Apply filters
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}
	if level := c.Query("level"); level != "" {
		query = query.Where("level = ?", level)
	}

	if err := query.Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	c.JSON(http.StatusOK, projects)
}

// @Summary Get project
// @Description Get project by ID with owner and members
// @Tags projects
// @Produce json
// @Param id path int true "Project ID"
// @Success 200 {object} models.Project
// @Failure 404 {object} map[string]interface{}
// @Router /projects/{id} [get]
func GetProject(c *gin.Context) {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	var project models.Project
	if err := database.GetDB().
		Preload("Owner").
		Preload("Members.User").
		First(&project, projectID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, project)
}

// @Summary Update project
// @Description Update project (only owner can update)
// @Tags projects
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path int true "Project ID"
// @Param project body UpdateProjectRequest true "Project update data"
// @Success 200 {object} models.Project
// @Failure 400 {object} map[string]interface{}
// @Failure 403 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Router /projects/{id} [put]
func UpdateProject(c *gin.Context) {
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

	var project models.Project
	if err := database.GetDB().First(&project, projectID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	// Check if user is the owner
	if project.OwnerID != userID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only project owner can update the project"})
		return
	}

	var req UpdateProjectRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update fields
	if req.Title != "" {
		project.Title = req.Title
	}
	project.Description = req.Description
	project.Category = req.Category
	project.Level = req.Level

	if err := database.GetDB().Save(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
		return
	}

	// Load the owner data
	database.GetDB().Preload("Owner").First(&project, project.ID)

	c.JSON(http.StatusOK, project)
}

// @Summary Delete project
// @Description Delete project (only owner can delete)
// @Tags projects
// @Security BearerAuth
// @Param id path int true "Project ID"
// @Success 204
// @Failure 403 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Router /projects/{id} [delete]
func DeleteProject(c *gin.Context) {
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

	var project models.Project
	if err := database.GetDB().First(&project, projectID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	// Check if user is the owner
	if project.OwnerID != userID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only project owner can delete the project"})
		return
	}

	if err := database.GetDB().Delete(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}

	c.Status(http.StatusNoContent)
}
