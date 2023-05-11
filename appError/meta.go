package appError

import (
	jsonIter "github.com/json-iterator/go"
	"net/http"
)

var json = jsonIter.ConfigCompatibleWithStandardLibrary

type ErrorSchema struct {
	Meta       ErrorSchemaMeta
	StatusCode int
}
type ErrorSchemaMeta struct {
	Message     string `json:"error"`
	Description string `json:"error_description"`
}

var (
	invalidClientId = ErrorSchema{
		Meta:       ErrorSchemaMeta{Message: "Bad or missing Client Id", Description: "Your request did not contain the correct Client Id. Refer to the request’s API reference page to see which parameters are required or learn more about authenticating with SSOJet."},
		StatusCode: http.StatusUnauthorized,
	}
	invalidClientSecret = ErrorSchema{
		Meta:       ErrorSchemaMeta{Message: "Bad or missing Client Secret", Description: "Your request did not contain the correct Client Secret."},
		StatusCode: http.StatusUnauthorized,
	}
)

func (e *ErrorSchema) Marshal() []byte {
	errBytes, _ := json.Marshal(e.Meta)
	return errBytes
}
