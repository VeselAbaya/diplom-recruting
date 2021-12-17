FROM node:14

WORKDIR /usr/src/app/backend
COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./

RUN yarn install
