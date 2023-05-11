package appError

import (
	"net/http"
)

type ErrorResponseType int

type Response struct {
	Message        []byte
	HTTPStatusCode int
}

type AppError struct {
	InvalidClientId     *Response
	InvalidClientSecret *Response
}

func NewAppError() *AppError {
	return &AppError{
		InvalidClientId: &Response{
			Message:        invalidClientId.Marshal(),
			HTTPStatusCode: invalidClientId.StatusCode,
		},
		InvalidClientSecret: &Response{
			Message:        invalidClientSecret.Marshal(),
			HTTPStatusCode: invalidClientSecret.StatusCode,
		},
	}
}

func (e *AppError) NewCustomError(msg string) *Response {
	return &Response{
		Message:        []byte(msg),
		HTTPStatusCode: http.StatusInternalServerError,
	}
}

func (resp *Response) WriteToResponseWriter(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.HTTPStatusCode)
	_, _ = w.Write(resp.Message)
}
