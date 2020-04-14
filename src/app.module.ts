import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import * as ormconfig from './ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TodosModule,
  ],
})
export class AppModule {}
