FROM node:20-slim

ENV NODE_ENV='production' NODE_OPTIONS='--max_old_space_size=8192'

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]