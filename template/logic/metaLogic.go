package logic

import (
	"sendright/appError"
	"sendright/domain"
)

type MetaLogic struct {
	appError *appError.AppError
}

func NewMetaLogic(appError *appError.AppError) domain.MetaLogic {
	return &MetaLogic{appError: appError}
}
