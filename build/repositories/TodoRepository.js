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
const Todo_1 = __importDefault(require("../models/Todo"));
class HostRepository {
    create(title) {
        return Todo_1.default.create({ title });
    }
    findByTitle(title) {
        return Todo_1.default.findOne({ where: { title } });
    }
    list() {
        return Todo_1.default.findAll({
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["password"] }
        });
    }
    updateState(id, complete) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo_1.default.findOne({ where: { id } });
            if (todo) {
                todo.complete = complete;
                todo.save();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const host = yield Todo_1.default.findOne({ where: { id } });
            if (host)
                host.destroy();
        });
    }
}
exports.default = HostRepository;
