package handler

import (
	"encoding/json"
	"sendright/appError"
	"sendright/domain"
	"sendright/model"
	"sendright/utility"

	"github.com/gofiber/fiber/v2"
)

type TemplateHandler struct {
	jsonWriter    *utility.JsonWriter
	templateLogic domain.TemplateLogic
	appErrors     *appError.AppError
}

func NewTemplateHandler(router fiber.Router, templateLogic domain.TemplateLogic, appErrors *appError.AppError, jsonWriter *utility.JsonWriter) {
	templateHandler := &TemplateHandler{templateLogic: templateLogic, appErrors: appErrors, jsonWriter: jsonWriter}

	// api/v1/template/build
	router.Post("/build", templateHandler.BuildTemplate)
}

func (handler *TemplateHandler) BuildTemplate(context *fiber.Ctx) error {
	var requestModel model.BuildTemplateRequest
	if err := json.Unmarshal(context.Body(), &requestModel); err != nil {
		return handler.appErrors.MalformedRequest.WriteToResponseWriter(context)
	}

	resp, err := handler.templateLogic.BuildTemplate(&requestModel)
	if err != nil {
		return err.WriteToResponseWriter(context)
	}
	return handler.jsonWriter.WriteToResponseWriter(context, resp)
}
