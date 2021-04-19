import { NextFunction, Request, Response } from "express";

export default class AuthMiddleware {
  protected request: Request;

  protected response: Response;

  protected next: NextFunction;

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request;
    this.response = response;
    this.next = next;
  }

  protected async validate(type: "admin" | "host") {
    return this.next();
  }

  async admin() {
    return this.validate("admin");
  }

  async host() {
    return this.validate("host");
  }
}
