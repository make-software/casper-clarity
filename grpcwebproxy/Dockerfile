from golang:alpine as builder
RUN apk --no-cache add git
RUN go get -u github.com/improbable-eng/grpc-web/go/grpcwebproxy

from alpine
RUN apk --no-cache add ca-certificates
WORKDIR /
COPY --from=builder /go/bin/grpcwebproxy .
CMD ["/grpcwebproxy"]

# Based on https://hub.docker.com/r/mozgiii/docker-grpcwebproxy/dockerfile
# but I want the newer features like CORS.
# Alternatively we could just pull the pre-built binaries:
# https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy#pre-build-binaries
