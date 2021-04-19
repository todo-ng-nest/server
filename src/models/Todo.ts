import { DataTypes, Model, Optional } from "sequelize";
import database from "../database";

interface TodoAttributes {
  id: number;
  title: string;
  complete: boolean;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, "id" | "complete"> {}

export default class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public complete!: boolean;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  { sequelize: database }
);

(async () => await database.sync())();
