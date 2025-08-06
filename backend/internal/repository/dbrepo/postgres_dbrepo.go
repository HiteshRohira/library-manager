package dbrepo

import (
	"backend/internal/models"
	"context"
	"database/sql"
	"time"
)

type PostgresDBRepo struct {
	DB *sql.DB
}

const dbTimeout = time.Second * 3

func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}

func (m *PostgresDBRepo) AllBooks() ([]*models.Book, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		select
			id, title, author, publisher, publish_date,
			pages, description, coalesce(image, ''),
			created_at, updated_at
		from
			books
		order by
			title
	`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var books []*models.Book

	for rows.Next() {
		var book models.Book
		err := rows.Scan(
			&book.ID,
			&book.Title,
			&book.Author,
			&book.Publisher,
			&book.PublishDate,
			&book.Pages,
			&book.Description,
			&book.Image,
			&book.CreatedAt,
			&book.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		books = append(books, &book)
	}

	return books, nil
}
