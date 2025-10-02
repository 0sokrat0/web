package database

import (
	"database/sql"
	"modernc.org/sqlite"
)

func init() {
	// Register the pure Go SQLite driver
	sql.Register("sqlite", &sqlite.Driver{})
}
