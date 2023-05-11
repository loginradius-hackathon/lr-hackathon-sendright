package utility

import (
	"github.com/gofiber/fiber/v2"
	jsonIter "github.com/json-iterator/go"
	"net/http"
)

type JsonWriter struct{}

func NewJsonWriter() *JsonWriter {
	return &JsonWriter{}
}

func (writer *JsonWriter) WriteToResponseWriter(ctx *fiber.Ctx, response interface{}) error {
	ctx.Response().Header.Set("Content-Type", "application/json; charset=utf-8")
	ctx.Response().SetStatusCode(http.StatusOK)
	_ = jsonIter.NewEncoder(ctx.Response().BodyWriter()).Encode(response)
	return nil
}
