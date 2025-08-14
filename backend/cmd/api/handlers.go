package main

import (
	"errors"
	"net/http"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Library manager up and running",
		Version: "1.0.0",
	}

	_ = app.writeJSON(w, http.StatusOK, payload)
}

func (app *application) AllBooks(w http.ResponseWriter, r *http.Request) {
	books, err := app.DB.AllBooks()
	if err != nil {
		app.errorJson(w, err)
		return
	}

	_ = app.writeJSON(w, http.StatusOK, books)
}

func (app *application) authenticate(w http.ResponseWriter, r *http.Request) {
	// read json payload
	var requestPayload struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := app.readJson(w, r, &requestPayload)
	if err != nil {
		app.errorJson(w, err)
		return
	}

	// validate user against database
	user, err := app.DB.GetUserByEmail(requestPayload.Email)
	if err != nil {
		app.errorJson(w, errors.New("Your email or password maybe incorrect"))
		return
	}

	// check password
	valid, err := user.PasswordMatches(requestPayload.Password)
	if err != nil || !valid {
		app.errorJson(w, errors.New("Your email or password maybe incorrect"))
		return
	}

	// create a jwt user
	u := jwtUser{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}

	// generate tokens
	tokens, err := app.auth.GenerateTokenPair(&u)
	if err != nil {
		app.errorJson(w, err)
		return
	}

	refreshCookie := app.auth.GetRefreshCookie(tokens.RefreshToken)
	http.SetCookie(w, refreshCookie)

	// Write to the browser
	app.writeJSON(w, http.StatusAccepted, tokens)
}
