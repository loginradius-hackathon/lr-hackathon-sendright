package chatGpt

import (
	"fmt"
	"github.com/chatgp/gpt3"
	"log"
	"time"
)

type Service struct {
	gptClient *gpt3.Client
}

func NewChatGptService(apiKey string) *Service {
	gptClient, _ := gpt3.NewClient(&gpt3.Options{
		ApiKey:  apiKey,
		Timeout: 30 * time.Second,
		Debug:   true,
	})
	return &Service{gptClient: gptClient}
}

func (s *Service) Get() {
	uri := "/v1/completions"
	params := map[string]interface{}{
		"model":       "text-davinci-003",
		"prompt":      "say hello three times",
		"max_tokens":  2048,
		"temperature": 0.9,
		"n":           1,
		"stream":      false,
	}

	res, err := s.gptClient.Post(uri, params)

	if err != nil {
		log.Fatalf("request api failed: %v", err)
	}

	fmt.Println(res.GetString("choices.0.text"))
}
