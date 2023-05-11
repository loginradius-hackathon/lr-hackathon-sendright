FROM golang:1.20-alpine AS builder

RUN apk update && apk add git && apk add --no-cache ca-certificates && rm -rf /var/cache/apk/*

WORKDIR /go/src/lr-hackathon-sendright

COPY . .

RUN go mod download
RUN GOARCH=amd64 GOOS=linux CGO_ENABLED=0 go build -ldflags "-s -w" ./main.go

EXPOSE 4000

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /go/src/lr-hackathon-sendright/main .
CMD ["./main"]