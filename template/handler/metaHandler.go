package handler

import (
	"sendright/constant"
	"sendright/domain"
	"sendright/utility"

	"github.com/gofiber/fiber/v2"
)

type MetaHandler struct {
	jsonWriter *utility.JsonWriter
	metaLogic  domain.MetaLogic
}

func NewMetaHandler(router fiber.Router, templateLogic domain.TemplateLogic, jsonWriter *utility.JsonWriter) {
	metaHandler := &MetaHandler{metaLogic: templateLogic, jsonWriter: jsonWriter}

	// api/v1/meatdata
	router.Get("", metaHandler.GetMetadata)
}

func (handler *MetaHandler) GetMetadata(c *fiber.Ctx) error {

	if err := c.JSON(&fiber.Map{
		"success":     true,
		"languages":   constant.Languages,
		"industries":  constant.Industries,
		"email_types": constant.EmailTypes,
	}); err != nil {
		c.Status(500).JSON(&fiber.Map{
			"success": false,
			"message": err,
		})
	}
	return nil
}
