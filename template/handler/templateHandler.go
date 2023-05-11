package handler

import (
	"github.com/gofiber/fiber/v2"
	"sendright/domain"
	"sendright/utility"
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
