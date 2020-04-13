import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
// import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
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

  async findAll(query) {
    const queryBuilder = await getRepository(Todo)
      .createQueryBuilder('todos')

    queryBuilder.orderBy('todos.updated_at', 'DESC')
    queryBuilder.where("1=1")

    if ('isChecked' in query) {
      queryBuilder.andWhere('todos.is_checked = :isChecked' , {isChecked : query.isChecked} )
    }
    if ('value' in query) {
      queryBuilder.andWhere('todos.value LIKE :value', { value: `%${query.value}%`})
    }
    
    if ('before' in query) {
      queryBuilder.andWhere('todos.updated_at <= :before', {before: query.before})
    } else if ('after' in query) {
      queryBuilder.andWhere('todos.updated_at >= :after', {after: query.after})
    }
    if ('sort' in query) {
      queryBuilder.orderBy('todos.updated_at', query.sort)
    }
    let limit = 50
    let offset = 0
    if ('count' in query) {
      limit = query.count > 50 ? 50 : query.count
    }
    if ('page' in query) {
      offset = query.page * limit
    }
    queryBuilder.limit(limit)
    queryBuilder.offset(offset)
    const todos = await queryBuilder.getMany()
    return todos
  }
}
