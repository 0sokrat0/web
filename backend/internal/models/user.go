package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Name         string `gorm:"not null" json:"name"`
	Email        string `gorm:"unique;not null" json:"email"`
	PasswordHash string `gorm:"not null" json:"-"`
	Skills       string `json:"skills"`
	Bio          string `json:"bio"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

type UserResponse struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Skills    string    `json:"skills"`
	Bio       string    `json:"bio"`
	CreatedAt time.Time `json:"created_at"`
}
