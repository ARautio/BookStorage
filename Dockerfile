FROM node:14-alpine

RUN apk add --no-cache python make g++

WORKDIR /usr/src/app

VOLUME /books
VOLUME /covers
VOLUME /config

ENV BOOK_PATH /books
ENV COVER_PATH /covers
ENV CONFIG_PATH /config

ARG MANAGER_URL
ARG MANAGER_SOCKET_URL


# Web platform
COPY ./packages/web ./packages/web
COPY ./packages/manager ./packages/manager
COPY ./Gruntfile.js ./Gruntfile.js
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install
RUN yarn run build

EXPOSE 5000 8000
CMD ["yarn","run","start"]