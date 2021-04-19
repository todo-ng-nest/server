import { Request, Response } from "express";
import Joi from "joi";
import TodoRepository from "../repositories/TodoRepository";
import Validation from "../services/Validation";

export default class TodoController {
  protected request: Request;

  protected response: Response;

  protected todoRepo: TodoRepository;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
    this.todoRepo = new TodoRepository();
  }

  async create() {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required()
    });
    const { value, error } = new Validation(schema, this.request.body).validate();
    if (error) return this.response.status(422).json(error);
    const { title } = value;
    const existingTodo = await this.todoRepo.findByTitle(title);
    if (existingTodo) {
      const error = { message: "Todo already taken" };
      return this.response.status(400).json(error);
    }
    const host: any = await this.todoRepo.create(title);
    this.response.status(201).json(host);
  }

  async list() {
    const hosts = await this.todoRepo.list();
    this.response.status(200).json(hosts);
  }

  async updateState() {
    const schema = Joi.object({
      id: Joi.number().required()
    });
    const { value, error } = new Validation(schema, this.request.body).validate();
    if (error) return this.response.status(422).json(error);
    await this.todoRepo.updateState(value.id, value.complete);
    this.response.status(200).json({ updated: true });
  }

  async delete() {
    const schema = Joi.object({
      id: Joi.number().required()
    });
    const { value, error } = new Validation(schema, this.request.body).validate();
    if (error) return this.response.status(422).json(error);
    const { id } = value;
    await this.todoRepo.delete(id);
    this.response.status(200).json({ deleted: true });
  }
}
