FROM golang:1.20 AS builder

WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./

RUN CGO_ENABLED=0 go build -o bin/go-api


FROM debian:bullseye-slim as runner

WORKDIR /runner
COPY --from=builder /build .

ENTRYPOINT [ "/runner/bin/go-api" ]
