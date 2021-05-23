
import * as mongoose from 'mongoose';
import { appContants } from '../app.constants';

const DB_URL = process.env.DB_URL || 'mongodb://192.168.0.8:27017/todo';

export const databaseProviders = [
  {
    provide: appContants.providers.db.connection,
    useFactory: (): Promise<typeof mongoose> => {

      return mongoose.connect(DB_URL, {
        useUnifiedTopology: true
      });
    }
  },
];