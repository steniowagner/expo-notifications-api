FROM node:alpine

ENV HOME=/usr/app

COPY package*.json $HOME/server/

WORKDIR $HOME/server

RUN npm install

COPY . $HOME/server

CMD ["npm", "start"]
