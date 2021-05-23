
import { Connection } from 'mongoose';
import { appContants } from 'src/config/app.constants';
import { TodoSchema } from './models/todo.schema';

export const todoProviders = [
  {
    provide: appContants.providers.db.models.todo,
    useFactory: (connection: Connection) => connection.model('Todo', TodoSchema),
    inject: [appContants.providers.db.connection],
  },
];