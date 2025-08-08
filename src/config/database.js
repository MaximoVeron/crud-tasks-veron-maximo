import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'tasks_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false
    },
);

export default sequelize;

export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado a la base de datos");
        await sequelize.sync();
        console.log("Modelos sincronizados con la base de datos");
    } catch(error) {
        console.error("Error al conectarse a la base de datos:", error);
    }
};


