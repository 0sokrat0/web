package main

import (
	"log"
	"os"

	"project-exchange/internal/database"
	"project-exchange/internal/routes"

	"github.com/joho/godotenv"
)

// @title Project Exchange API
// @version 1.0
// @description This is a project exchange platform API
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.

func main() {
	// Load environment variables
	if err := godotenv.Load("config.env"); err != nil {
		log.Println("No config.env file found, using system environment variables")
	}

	// Set default values if environment variables are not set
	if os.Getenv("SECRET_KEY") == "" {
		os.Setenv("SECRET_KEY", "your-super-secret-jwt-key-change-this-in-production")
	}
	if os.Getenv("DB_PATH") == "" {
		os.Setenv("DB_PATH", "./data.db")
	}
	if os.Getenv("PORT") == "" {
		os.Setenv("PORT", "8080")
	}

	// Initialize database
	database.InitDatabase(os.Getenv("DB_PATH"))

	// Setup routes
	router := routes.SetupRoutes()

	// Start server
	port := os.Getenv("PORT")
	log.Printf("Server starting on port %s", port)
	log.Printf("Swagger documentation available at http://localhost:%s/swagger/index.html", port)

	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
