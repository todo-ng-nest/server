import Todo from "../models/Todo";

export default class HostRepository {
  create(title: string) {
    return Todo.create({ title });
  }

  findByTitle(title: string) {
    return Todo.findOne({ where: { title } });
  }

  list() {
    return Todo.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["password"] }
    });
  }

  async updateState(id: string, complete: boolean) {
    const todo = await Todo.findOne({ where: { id } });
    if (todo) {
      todo.complete = complete;
      todo.save();
    }
  }

  async delete(id: string) {
    const host = await Todo.findOne({ where: { id } });
    if (host) host.destroy();
  }
}
