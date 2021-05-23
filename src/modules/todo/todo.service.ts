import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './models/Todo';
import { Todo as TodoInterface } from './models/todo.interface';
import { find, findIndex, omit } from "lodash";
import { Model } from 'mongoose';
import { appContants } from 'src/config/app.constants';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  constructor(
    @Inject(appContants.providers.db.models.todo)
    private todoModel: Model<TodoInterface>,
  ) {
    this.todoModel.find().exec().then(data => {
      this.todos = data.map(todo => omit(JSON.parse(JSON.stringify(todo)), ['_id']));
    });
  }

  all(): Todo[] {
    return this.todos;
  }

  one(id: number): Todo | undefined {
    return find(this.todos, { id });
  }

  add(todo: CreateTodoDto): Todo {
    todo.id = this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1;
    new this.todoModel(todo).save();
    this.todos.push(todo);
    return todo;
  }

  async update(id: number, todo: UpdateTodoDto): Promise<UpdateTodoDto> {
    await this.todoModel.updateOne({ id }, todo);
    const index = findIndex(this.todos, { id });
    if (index >= 0) this.todos[index] = { ...this.todos[index], ...todo };
    return todo;
  }

  drop(id: number): Todo[] {
    this.todoModel.deleteOne({ id });
    return this.todos = this.todos.filter(todo => todo.id != id);
  }
}
