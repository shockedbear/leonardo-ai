FROM node:22-slim
RUN apt-get update -y && apt-get install -y openssl
USER node