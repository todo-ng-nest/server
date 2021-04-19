"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors = require("cors");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./router"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const corsOptions = {
    origin: ["http://localhost", "http://localhost:4200"],
    credentials: true
};
const webAppHost = process.env.WEB_APP_HOST;
const webAppUrl = `https://${webAppHost}`;
if (webAppHost)
    corsOptions.origin.push(webAppUrl);
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
new router_1.default(app).initialize();
server.listen(process.env.PORT, () => console.log(process.env.PORT));
