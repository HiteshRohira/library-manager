package main

import (
	"backend/internal/repository"
	"backend/internal/repository/dbrepo"
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"
)

const port = 8080

type application struct {
	DSN          string
	Domain       string
	DB           repository.DatabaseRepo
	auth         Auth
	JWTSecret    string
	JWTIssuer    string
	JWTAudience  string
	CookieDomain string
}

func main() {
	// set application config
	var app application

	// read from command line
	flag.StringVar(&app.DSN, "dsn", "host=localhost port=5432 user=postgres password=postgres dbname=books sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")
	flag.StringVar(&app.JWTSecret, "jwt-secret", "veryverysecretstring", "Signing secret")
	flag.StringVar(&app.JWTIssuer, "jwt-issuer", "example.com", "Signing issuer")
	flag.StringVar(&app.JWTAudience, "jwt-audience", "example.com", "Signing audience")
	flag.StringVar(&app.CookieDomain, "cookie-domain", "localhost", "Cookie domain")
	flag.StringVar(&app.Domain, "domain", "example.com", "Domain")
	flag.Parse()

	// connect to db
	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.DB.Connection().Close()

	app.auth = Auth{
		Issuer:        app.JWTIssuer,
		Audience:      app.JWTAudience,
		Secret:        app.JWTSecret,
		TokenExpiry:   time.Minute * 15,
		RefreshExpiry: time.Hour * 24,
		CookiePath:    "/",
		CookieName:    "__Host-refresh_token",
		CookieDomain:  "",
	}

	log.Println("Starting app on port:", port)

	// start a web server
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
