import { Request, Response } from "express";
import TodoController from "../controllers/TodoController";

export default [
  {
    method: "get",
    path: "/",
    controller(request: Request, response: Response) {
      return response.send({ version: "0.1.1", name: "todos" });
    }
  },
  {
    method: "get",
    path: "/api",
    controller(request: Request, response: Response) {
      return response.send({ version: "0.1.1", name: "api/todos" });
    }
  },
  {
    method: "post",
    path: "/api/todos",
    controller(request: Request, response: Response) {
      return new TodoController(request, response).create();
    }
  },
  {
    method: "get",
    path: "/api/todos",
    controller(request: Request, response: Response) {
      return new TodoController(request, response).list();
    }
  },
  {
    method: "put",
    path: "/api/todos",
    controller(request: Request, response: Response) {
      return new TodoController(request, response).updateState();
    }
  },
  {
    method: "delete",
    path: "/api/todos",
    controller(request: Request, response: Response) {
      return new TodoController(request, response).delete();
    }
  }
];
