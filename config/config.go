package config

import (
	"log"
	"sync"

	"github.com/caarlos0/env/v8"
	"github.com/joho/godotenv"
)

type Config struct {
	Version         string `env:"Version" envDefault:"0.1-alpha"`
	MongoTimeout    int64  `env:"MongoTimeout" envDefault:"10000"`
	ApplicationName string `envDefault:"SendRight"`
	ServiceAddress  string `env:"ServiceAddress" envDefault:"0.0.0.0:4000"`
	MongoDbDataBase string `env:"MongoDbDataBase" envDefault:"sendright-dev"`
	MongoDbConnStr  string `env:"MongoDbConnStr" envDefault:"mongodb://localhost:27017/?retryWrites=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000"`

	OpenAISecret string `env:"OpenAISecret" envDefault:""`
}

// singleton instance of config
var instantiated *Config

var once sync.Once

// Read and parse the configuration file
func read() *Config {
	godotenv.Load(".env")
	config := Config{}
	if err := env.Parse(&config); err != nil {
		log.Fatal(err)
	}
	return &config
}

func GetInstance() *Config {
	once.Do(func() {
		instantiated = read()
	})
	return instantiated
}
