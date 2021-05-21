FROM node:15.14.0-alpine3.10

WORKDIR /workspace

RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY . ./
RUN chmod -Rv 777 src/*

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
