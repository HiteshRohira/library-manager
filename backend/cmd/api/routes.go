package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	// create a router mux
	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)
	mux.Use(app.enableCors)

	mux.Get("/api/home", app.Home)

	mux.Post("/api/authenticate", app.authenticate)
	mux.Get("/api/refresh", app.refreshToken)

	mux.Get("/api/books", app.AllBooks)

	return mux
}
