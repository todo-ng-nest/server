import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './models/Todo';
import { find, findIndex } from "lodash";

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: true },
    { id: 2, title: 'Learn React', completed: false }
  ];

  all(): Todo[] {
    return this.todos;
  }

  one(id: number): Todo | undefined {
    return find(this.todos, { id });
  }

  add(todo: CreateTodoDto): Todo {
    todo.id = this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1;
    this.todos.push(todo);
    return todo;
  }

  update(id: number, todo: UpdateTodoDto): UpdateTodoDto {
    const index = findIndex(this.todos, { id });
    if (index >= 0) this.todos[index] = { ...this.todos[index], ...todo };
    return todo;
  }

  drop(id: number): Todo[] {
    return this.todos = this.todos.filter(todo => todo.id != id);
  }
}
