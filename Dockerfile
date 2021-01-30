FROM node:10-alpine

WORKDIR /usr/src/app

# Web platform
RUN cd packages/web/ && npm install
RUN cd packages/web/ && npm run build
COPY packages/web/dist packages/web

# Manager platform
RUN cd packages/manager && npm install
COPY packages/manager packages/manager

# Main setup
COPY package*.json .
RUN npm install
EXPOSE 5000 8000
CMD ["npm", "dev"]