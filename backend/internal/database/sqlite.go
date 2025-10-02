package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"modernc.org/sqlite"
)

func init() {
	// Register the pure Go SQLite driver
	sqlite.RegisterDriver()
}

// OpenSQLite opens a SQLite database using the pure Go driver
func OpenSQLite(dsn string) (*gorm.DB, error) {
	return gorm.Open(sqlite.Open(dsn), &gorm.Config{})
}
