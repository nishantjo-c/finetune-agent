FROM alpine:3.20

RUN echo "Hello from BuildKit"

CMD ["echo", "BuildKit works"]
