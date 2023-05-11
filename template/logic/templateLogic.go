package logic

import (
	"sendright/appError"
	"sendright/domain"
)

type TemplateLogic struct {
	appError *appError.AppError
}

func NewTemplateLogic(appError *appError.AppError) domain.TemplateLogic {
	return &TemplateLogic{appError: appError}
}
