FROM node:15.14.0-alpine3.10

WORKDIR /workspace

RUN npm install -g npm@latest
RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY . ./
VOLUME [ "./", '/workspace' ]

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
