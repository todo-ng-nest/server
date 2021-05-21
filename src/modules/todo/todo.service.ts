import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './models/Todo';
import { find } from "lodash";

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn Angular', complete: true },
    {id: 1, title: 'Learn React', complete: false}
  ]

  all(): Todo[] {
    return this.todos
  }

  one(id: number): Todo | undefined {
    return find(this.todos, {id})
  }

  add(todo: CreateTodoDto): Todo {
    this.todos.push(todo)
    return todo
  }

  update(id: number, todo: UpdateTodoDto): UpdateTodoDto {
    return todo
  }

  drop(id: number): Todo[] {
    return this.todos.filter(todo => todo.id != id)
  }
}
