import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Todo } from './todos.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto'

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(payload: CreateTodoDto) {
    const todo: Todo = new Todo();
    todo.value = payload.value
    todo.due = payload.due
    if ('parentId' in payload) {
      const parentTodo = await this.todoRepository.findOne(payload.parentId)
      if (parentTodo !== null) {
        todo.parent = parentTodo;
      } 
    }
    const createdTodo = await this.todoRepository.save(todo);
    return createdTodo;
  }

  async findAll(query) {
    const queryBuilder = await getRepository(Todo)
      .createQueryBuilder('todos')
      .leftJoinAndSelect('todos.parent', 'parent')

    queryBuilder.orderBy('todos.updated_at', 'DESC')
    queryBuilder.where("1=1")
    queryBuilder.andWhere('todos.deleted_at IS NULL');
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

  async update(todoId : number, payload : UpdateTodoDto) {
    const todo: Todo = await this.todoRepository.findOne(todoId, {relations : ['children']})
    if ('value' in payload) {
      todo.value = payload.value
    }
    if ('due' in payload) {
      todo.due = payload.due
    }
    if ('isChecked' in payload) {
      todo.isChecked = payload.isChecked
      if (todo.children.length > 0) {
        todo.children.forEach(child => {
          child.isChecked = payload.isChecked
        })
      }
    }
    if (todo.deletedAt !== null) {
      todo.deletedAt = null
      if (todo.children.length > 0) {
        todo.children.forEach(child => {
          child.deletedAt = null
        })
      }
    }
    const updatedTodo = await this.todoRepository.save(todo);
    return updatedTodo
  }

  async softDelete(todoId : number) {
    const todo: Todo = await this.todoRepository.findOne(todoId, {relations: ['children']})
    if (todo.deletedAt === null) {
      const nowDate = new Date(); 
      todo.deletedAt = nowDate;
      if (todo.children.length > 0) {
        todo.children.forEach(child => {
          child.deletedAt = nowDate;
        })
      }
    }
    const deletedTodo = await this.todoRepository.save(todo);
    return deletedTodo
  }
}
