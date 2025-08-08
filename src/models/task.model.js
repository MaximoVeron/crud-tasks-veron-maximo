import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const modelTask = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
}, {
  timestamps: true, 
  tableName: 'tasks', 
});

export default modelTask;
