import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodoModule } from './modules/todo/todo.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [TodoModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
