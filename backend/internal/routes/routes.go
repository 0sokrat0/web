package routes

import (
	"project-exchange/internal/handlers"
	"project-exchange/internal/middleware"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func SetupRoutes() *gin.Engine {
	router := gin.Default()

	// Middleware
	router.Use(middleware.CORS())

	// Swagger documentation
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// API routes
	api := router.Group("/api")
	{
		// Auth routes (public)
		auth := api.Group("/auth")
		{
			auth.POST("/register", handlers.Register)
			auth.POST("/login", handlers.Login)
		}

		// User routes
		users := api.Group("/users")
		{
			users.GET("/:id", handlers.GetUser)
			users.PUT("/:id", middleware.AuthMiddleware(), handlers.UpdateUser)
		}

		// Project routes
		projects := api.Group("/projects")
		{
			projects.GET("", handlers.GetProjects)
			projects.POST("", middleware.AuthMiddleware(), handlers.CreateProject)
			projects.GET("/:id", handlers.GetProject)
			projects.PUT("/:id", middleware.AuthMiddleware(), handlers.UpdateProject)
			projects.DELETE("/:id", middleware.AuthMiddleware(), handlers.DeleteProject)

			// Member routes
			projects.POST("/:id/apply", middleware.AuthMiddleware(), handlers.ApplyToProject)
			projects.POST("/:id/accept/:userId", middleware.AuthMiddleware(), handlers.AcceptMember)

			// Message routes
			projects.GET("/:id/messages", middleware.AuthMiddleware(), handlers.GetProjectMessages)
			projects.POST("/:id/messages", middleware.AuthMiddleware(), handlers.SendMessage)
		}
	}

	return router
}
