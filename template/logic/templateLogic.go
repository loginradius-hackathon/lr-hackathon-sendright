package logic

import (
	"bufio"
	"sendright/appError"
	"sendright/domain"
	"sendright/model"
	"sendright/service/openAI"
	"strings"
)

type TemplateLogic struct {
	appError      *appError.AppError
	openAIService *openAI.Service
}

func (logic *TemplateLogic) BuildTemplate(request *model.BuildTemplateRequest) (*model.BuildTemplateResponse, *appError.Response) {

	text := "Generate an email template in text format with subject for " + request.TemplateType

	if request.Language != nil && len(*request.Language) > 0 {
		text += " in " + *request.Language + " language"
	}

	if request.IndustryContext != nil && len(*request.IndustryContext) > 0 {
		text += " for the " + *request.IndustryContext + " industry."
	}

	if request.SenderName != nil && len(*request.SenderName) > 0 {
		text += ", Sender name " + *request.SenderName
	}

	if request.SenderName != nil && len(*request.SenderName) > 0 {
		text += ", Receiver name " + *request.ReceiverName
	}

	if request.Sentiment != nil && len(*request.Sentiment) > 0 {
		text += ", Keep the tone of email " + *request.Sentiment
	}

	if request.Prompt != nil && len(*request.Prompt) > 0 {
		text += " and some additional information -" + *request.Prompt
	}

	content, err := logic.openAIService.Get(text)
	if err != nil || content == nil {
		return nil, logic.appError.InternalServerError
	}
	ioReader := strings.NewReader(*content)
	fileScanner := bufio.NewScanner(ioReader)

	fileScanner.Split(bufio.ScanLines)

	i := 0
	emailSubject := ""
	emailBody := ""

	for fileScanner.Scan() {
		if i == 2 {
			emailSubject += fileScanner.Text()
		} else if i > 3 {
			emailBody += fileScanner.Text() + "<br/>"
		}
		i++
	}

	return &model.BuildTemplateResponse{ContentText: emailBody, Subject: emailSubject}, nil
}

func NewTemplateLogic(openAIService *openAI.Service, appError *appError.AppError) domain.TemplateLogic {
	return &TemplateLogic{openAIService: openAIService, appError: appError}
}
