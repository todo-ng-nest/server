require("dotenv").config();
const cors = require("cors");
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import Router from "./router";

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ["http://localhost", "http://localhost:4200"],
  credentials: true
};

const webAppHost = process.env.WEB_APP_HOST;
const webAppUrl = `https://${webAppHost}`;
if (webAppHost) corsOptions.origin.push(webAppUrl);

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(bodyParser.json());

new Router(app).initialize();

server.listen(process.env.PORT, () => console.log(process.env.PORT));
