FROM node:14

WORKDIR /usr/src/app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./

RUN yarn install
