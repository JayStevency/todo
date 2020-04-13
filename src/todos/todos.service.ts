import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todos.entity';
import { CreateTodoDto } from './dto'

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(payload: CreateTodoDto) {
    const todo: Todo = new Todo();
    todo.value = payload.value
    todo.due = payload.due

    const todoFromDb = await this.todoRepository.save(todo);
    return todoFromDb;
  }
}
