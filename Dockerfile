FROM node:15.14.0-alpine3.10

RUN addgroup app && adduser -SG app app
WORKDIR /home/app

COPY package*.json ./
RUN npm install
COPY . ./

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
