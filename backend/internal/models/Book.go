package models

import "time"

type Book struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Author      string    `json:"author"`
	Publisher   string    `json:"publisher"`
	PublishDate time.Time `json:"publish_date"`
	Genre       string    `json:"genre"`
	Pages       int       `json:"pages"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	CreatedAt   time.Time `json:"-"`
	UpdatedAt   time.Time `json:"-"`
}
