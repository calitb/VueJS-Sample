FROM node

RUN mkdir -p /app
WORKDIR /app
EXPOSE 8080
ENTRYPOINT sleep infinity