import { Sequelize } from 'sequelize';

// Database connection configuration
const sequelize = new Sequelize('database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Change this to your preferred database
  logging: false, // Set to true if you want to see SQL queries
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectToDatabase;
