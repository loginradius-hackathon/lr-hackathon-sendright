package openAI

import (
	"github.com/chatgp/gpt3"
	"time"
)

type Service struct {
	gptClient *gpt3.Client
}

func NewOpenAIService(apiKey string) *Service {
	gptClient, _ := gpt3.NewClient(&gpt3.Options{
		ApiKey:  apiKey,
		Timeout: 60 * time.Second,
		Debug:   true,
	})
	return &Service{gptClient: gptClient}
}

func (s *Service) Get(prompt string) (*string, error) {
	uri := "/v1/completions"
	params := map[string]interface{}{
		"model":       "text-davinci-003",
		"prompt":      prompt,
		"max_tokens":  2048,
		"temperature": 0.9,
		"n":           1,
		"stream":      false,
	}

	res, err := s.gptClient.Post(uri, params)
	if err != nil {
		return nil, err
	}

	resp := res.GetString("choices.0.text")
	return &resp, nil
}
