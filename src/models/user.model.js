import { DataTypes } from "sequelize";
import { Sequelize } from "../config/database.js";

// Define the User model    
export const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,   
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,   
    }
});
