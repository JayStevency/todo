import { Controller, Post, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto'

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Post()
  async createTodo(@Body() todo: CreateTodoDto) {
    return this.todosService.createTodo(todo)
  }
}
