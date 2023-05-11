package utility

import (
	jsonIter "github.com/json-iterator/go"
	"net/http"
)

type JsonWriter struct{}

func NewJsonWriter() *JsonWriter {
	return &JsonWriter{}
}

func (w2 *JsonWriter) WriteToResponseWriter(w http.ResponseWriter, response interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	_ = jsonIter.NewEncoder(w).Encode(response)
}

func (w2 *JsonWriter) WriteXMLToResponseWriter(w http.ResponseWriter, response string) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/xml; charset=utf-8")
	_, _ = w.Write([]byte(response))
}
