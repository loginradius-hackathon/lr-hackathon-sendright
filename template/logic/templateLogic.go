package logic

import (
	"sendright/appError"
	"sendright/domain"
	"sendright/model"
	"sendright/service/openAI"
	"strconv"
)

type TemplateLogic struct {
	appError      *appError.AppError
	openAIService *openAI.Service
}

func (logic *TemplateLogic) BuildTemplate(request *model.BuildTemplateRequest) (*model.BuildTemplateResponse, *appError.Response) {

	quantity := 1
	if request.Quantity != nil {
		quantity = *request.Quantity
	}
	text := "Generate " + strconv.Itoa(quantity) + " email template in text format " + request.TemplateType

	if request.Language != nil && len(*request.Language) > 0 {
		text += " in " + *request.Language + " language"
	}

	if request.IndustryContext != nil && len(*request.IndustryContext) > 0 {
		text += " for the " + *request.IndustryContext + " industry."
	}

	if request.SenderName != nil && len(*request.SenderName) > 0 {
		text += " Sender email " + *request.SenderName
	}

	if request.Sentiment != nil && len(*request.Sentiment) > 0 {
		text += " Keep the tone of email " + *request.Sentiment
	}

	if request.Prompt != nil && len(*request.Prompt) > 0 {
		text += " and some additinal information -" + *request.Prompt
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
