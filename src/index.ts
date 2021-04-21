require("dotenv").config();
import http from "http";
import express from "express";
import Router from "./router";

const cors = require("cors");
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

new Router(app).initialize();

server.listen(process.env.PORT, () => console.log(process.env.PORT));
