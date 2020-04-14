import { Controller, Post, Body, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto, FindAllTodoDto } from './dto'

@Controller('items')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Post()
  async createTodo(@Body() todo: CreateTodoDto) {
    return this.todosService.create(todo)
  }
  @Get()
  async findAllTodo(@Query() qs: FindAllTodoDto) {
    return this.todosService.findAll(qs)
  }
  @Patch(':itemId')
  async updateTodo(@Param() params, @Body() todo: UpdateTodoDto) {
    return this.todosService.update(params.itemId, todo)
  }
  @Delete(':itemId')
  async deleteTodo(@Param() params){
    return this.todosService.softDelete(params.itemId)
  }
}
