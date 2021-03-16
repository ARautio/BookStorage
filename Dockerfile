FROM node:14-alpine

WORKDIR /usr/src/app

VOLUME /books
VOLUME /covers
VOLUME /config


# Web platform
COPY ./packages/web ./

RUN npm install
RUN npm run build


EXPOSE 5000 8000
CMD ["npm", "dev"]