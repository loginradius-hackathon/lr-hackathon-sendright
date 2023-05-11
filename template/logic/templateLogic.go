package logic

import (
	"sendright/appError"
	"sendright/domain"
	"sendright/model"
	"sendright/service/openAI"
)

type TemplateLogic struct {
	appError      *appError.AppError
	openAIService *openAI.Service
}

func (logic *TemplateLogic) BuildTemplate(request *model.BuildTemplateRequest) (*model.BuildTemplateResponse, *appError.Response) {
	text := "generate transactional email template for " + request.TemplateType
	if request.IndustryContext != nil && len(*request.IndustryContext) > 0 {
		text += " in industry context " + *request.IndustryContext
	}

	content, err := logic.openAIService.Get(text)
	if err != nil || content == nil {
		return nil, logic.appError.InternalServerError
	}

	return &model.BuildTemplateResponse{ContentText: *content}, nil
}

func NewTemplateLogic(openAIService *openAI.Service, appError *appError.AppError) domain.TemplateLogic {
	return &TemplateLogic{openAIService: openAIService, appError: appError}
}
