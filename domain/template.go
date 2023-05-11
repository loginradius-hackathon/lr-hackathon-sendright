package domain

import (
	"sendright/appError"
	"sendright/model"
)

type Template struct {
}

type TemplateLogic interface {
	BuildTemplate(m *model.BuildTemplateRequest) (*model.BuildTemplateResponse, *appError.Response)
}

type TemplateRepository interface {
}
