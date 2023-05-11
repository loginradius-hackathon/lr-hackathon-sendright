package model

type BuildTemplateRequest struct {
	TemplateType string `json:"template_type"`

	IndustryContext *string `json:"industry_context,omitempty"`
	SenderName      *string `json:"sender_name,omitempty"`
	Language        *string `json:"language,omitempty"`
	Sentiment       *string `json:"sentiment,omitempty"`
	Prompt          *string `json:"prompt,omitempty"`
}

type BuildTemplateResponse struct {
	ContentText string `json:"content_text"`
}
