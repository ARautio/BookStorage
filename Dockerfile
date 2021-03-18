FROM node:14

WORKDIR /usr/src/app

VOLUME /books
VOLUME /covers
VOLUME /config

ENV BOOK_PATH /books
ENV COVER_PATH /covers
ENV CONFIG_PATH /config


# Web platform
COPY ./packages/web ./packages/web
COPY ./packages/manager ./packages/manager
COPY ./Gruntfile.js ./Gruntfile.js
COPY ./package.json ./package.json
RUN npm install
RUN cd packages/manager && npm install

EXPOSE 5000 8000
CMD ["npm","run","start"]