package appError

import (
	"github.com/gofiber/fiber/v2"
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
	MalformedRequest    *Response
	InternalServerError *Response
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
		MalformedRequest: &Response{
			Message:        malformedRequest.Marshal(),
			HTTPStatusCode: malformedRequest.StatusCode,
		},
		InternalServerError: &Response{
			Message:        internalServerError.Marshal(),
			HTTPStatusCode: internalServerError.StatusCode,
		},
	}
}

func (e *AppError) NewCustomError(msg string) *Response {
	return &Response{
		Message:        []byte(msg),
		HTTPStatusCode: http.StatusInternalServerError,
	}
}

func (resp *Response) WriteToResponseWriter(ctx *fiber.Ctx) error {
	ctx.Response().Header.Set("Content-Type", "application/json")
	ctx.Response().SetStatusCode(resp.HTTPStatusCode)
	_, _ = ctx.Write(resp.Message)
	return nil
}
