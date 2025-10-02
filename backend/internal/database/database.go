package database

import (
	"log"
	"project-exchange/internal/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase(dbPath string) {
	var err error
	
	// Use pure Go SQLite driver
	DB, err = OpenSQLite(dbPath + "?_pragma=foreign_keys(1)")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate the schemas
	err = DB.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.ProjectMember{},
		&models.Message{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database connected and migrated successfully")
}

func GetDB() *gorm.DB {
	return DB
}