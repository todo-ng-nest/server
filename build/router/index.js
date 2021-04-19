"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const routes_1 = __importDefault(require("./routes"));
class Router {
    constructor(app) {
        this.app = app;
    }
    initialize() {
        return lodash_1.map(routes_1.default, (route) => {
            return route.middleware
                ? this.app[route.method](route.path, route.middleware, route.controller)
                : this.app[route.method](route.path, route.controller);
        });
    }
}
exports.default = Router;
