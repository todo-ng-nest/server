"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TodoController_1 = __importDefault(require("../controllers/TodoController"));
exports.default = [
    {
        method: "get",
        path: "/",
        controller(request, response) {
            return response.send({ version: "0.1.1", name: "todos" });
        }
    },
    {
        method: "post",
        path: "/todos",
        controller(request, response) {
            return new TodoController_1.default(request, response).create();
        }
    },
    {
        method: "get",
        path: "/todos",
        controller(request, response) {
            return new TodoController_1.default(request, response).list();
        }
    },
    {
        method: "put",
        path: "/todos",
        controller(request, response) {
            return new TodoController_1.default(request, response).updateState();
        }
    },
    {
        method: "delete",
        path: "/todos",
        controller(request, response) {
            return new TodoController_1.default(request, response).delete();
        }
    }
];
