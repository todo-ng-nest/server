import { Document } from "mongoose";

export interface Todo extends Document {
  id: number;
  title: string;
  completed: boolean;
}
