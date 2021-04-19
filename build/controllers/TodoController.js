"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const TodoRepository_1 = __importDefault(require("../repositories/TodoRepository"));
const Validation_1 = __importDefault(require("../services/Validation"));
class TodoController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.todoRepo = new TodoRepository_1.default();
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                title: joi_1.default.string().min(3).max(30).required()
            });
            const { value, error } = new Validation_1.default(schema, this.request.body).validate();
            if (error)
                return this.response.status(422).json(error);
            const { title } = value;
            const existingTodo = yield this.todoRepo.findByTitle(title);
            if (existingTodo) {
                const error = { message: "Todo already taken" };
                return this.response.status(400).json(error);
            }
            const host = yield this.todoRepo.create(title);
            this.response.status(201).json(host);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const hosts = yield this.todoRepo.list();
            this.response.status(200).json(hosts);
        });
    }
    updateState() {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                id: joi_1.default.number().required()
            });
            const { value, error } = new Validation_1.default(schema, this.request.body).validate();
            if (error)
                return this.response.status(422).json(error);
            yield this.todoRepo.updateState(value.id, value.complete);
            this.response.status(200).json({ updated: true });
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                id: joi_1.default.number().required()
            });
            const { value, error } = new Validation_1.default(schema, this.request.body).validate();
            if (error)
                return this.response.status(422).json(error);
            const { id } = value;
            yield this.todoRepo.delete(id);
            this.response.status(200).json({ deleted: true });
        });
    }
}
exports.default = TodoController;
