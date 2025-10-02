package models

import (
	"gorm.io/gorm"
	"time"
)

type Project struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	OwnerID     uint   `gorm:"not null" json:"owner_id"`
	Owner       User   `gorm:"foreignKey:OwnerID" json:"owner"`
	Title       string `gorm:"not null" json:"title"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Level       string `json:"level"` // beginner/middle/expert
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
	
	// Relations
	Members  []ProjectMember `gorm:"foreignKey:ProjectID" json:"members,omitempty"`
	Messages []Message       `gorm:"foreignKey:ProjectID" json:"messages,omitempty"`
}

type ProjectMember struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	ProjectID uint   `gorm:"not null" json:"project_id"`
	Project   Project `gorm:"foreignKey:ProjectID" json:"project,omitempty"`
	UserID    uint   `gorm:"not null" json:"user_id"`
	User      User   `gorm:"foreignKey:UserID" json:"user"`
	Status    string `gorm:"default:pending" json:"status"` // pending/accepted/rejected
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Message struct {
	ID        uint    `gorm:"primaryKey" json:"id"`
	ProjectID uint    `gorm:"not null" json:"project_id"`
	Project   Project `gorm:"foreignKey:ProjectID" json:"project,omitempty"`
	UserID    uint    `gorm:"not null" json:"user_id"`
	User      User    `gorm:"foreignKey:UserID" json:"user"`
	Content   string  `gorm:"not null" json:"content"`
	CreatedAt time.Time `json:"created_at"`
}
