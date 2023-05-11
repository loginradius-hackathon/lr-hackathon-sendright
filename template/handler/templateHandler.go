package handler

import (
	"sendright/domain"
	"sendright/utility"

	"github.com/gofiber/fiber/v2"
)

type TemplateHandler struct {
	jsonWriter    *utility.JsonWriter
	templateLogic domain.TemplateLogic
}

func NewTemplateHandler(router fiber.Router, templateLogic domain.TemplateLogic, jsonWriter *utility.JsonWriter) {
	templateHandler := &TemplateHandler{templateLogic: templateLogic, jsonWriter: jsonWriter}

	// api/v1/template/build
	router.Post("/build", templateHandler.BuildTemplate)
}

func (handler *TemplateHandler) BuildTemplate(*fiber.Ctx) error {

	return nil
}
