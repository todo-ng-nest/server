import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { todoProviders } from './todo.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, ...todoProviders]
})
export class TodoModule { }
