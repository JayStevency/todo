import { Controller, Post, Body, Get, Query, Patch } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto'

@Controller('items')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Post()
  async createTodo(@Body() todo: CreateTodoDto) {
    return this.todosService.createTodo(todo)
  }
  @Get()
  async findAllTodo(@Query() qs) {
    return this.todosService.findAll(qs)
  }
}
