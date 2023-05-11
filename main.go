package main

import (
	"context"
	"log"
	"sendright/template/handler"
	"sendright/template/logic"
	"sendright/utility"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	_appError "sendright/appError"
	_config "sendright/config"
)

func main() {
	config := _config.GetInstance()
	appErrors := _appError.NewAppError()
	jsonWriter := utility.NewJsonWriter()

	ConnectToMongo(config.MongoDbConnStr, config.MongoTimeout).Database(config.MongoDbDataBase)

	app := fiber.New()
	router := app.Group("api/v1")

	templateRouter := router.Group("template")
	metaRouter := router.Group("metadata")

	metaLogic := logic.NewMetaLogic(appErrors)
	templateLogic := logic.NewTemplateLogic(appErrors)

	handler.NewTemplateHandler(templateRouter, templateLogic, jsonWriter)
	handler.NewMetaHandler(metaRouter, metaLogic, jsonWriter)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Listen(config.ServiceAddress)
}

func ConnectToMongo(connStr string, mongoTimeout int64) *mongo.Client {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(mongoTimeout))
	defer cancel()

	clientOptions := options.Client().ApplyURI(connStr)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	return client
}
