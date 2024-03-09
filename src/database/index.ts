import mysql from 'mysql';
import { seedData } from './seedData';
import executeSQL from './executeSQL';
interface IConnectionOptions {
    host: string;
    port: number | string;
    user: string;
    password: string;
    // user?: any; // Adjust the type according to your user object structure
}
const connectionOptions: IConnectionOptions | any = {
    host: process.env.MY_SQL_HOST || 'localhost',
    port: process.env.MY_SQL_PORT || 3306,
    user: process.env.MY_SQL_USER || 'root',
    password: process.env.MY_SQL_USER_PASSWORD || 'password',
  };

console.log('connectionOptions ==== ', connectionOptions);
const connection = mysql.createConnection(connectionOptions);

const createDatabase = async () => {
  try {
    await new Promise<void>((resolve, reject) => {
      connection.query('CREATE DATABASE IF NOT EXISTS grocery_db', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Error creating database: ', error);
    throw error;
  }
};

const useDatabase = async () => {
  try {
    await new Promise<void>((resolve, reject) => {
      connection.query('USE grocery_db', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Error selecting database: ', error);
    throw error;
  }
};

const executeSqlFiles = async () => {
  try {
    await executeSQL(connection);
  } catch (error) {
    console.error('Error executing SQL scripts: ', error);
    throw error;
  }
};

const initializeDatabase = async () => {
  try {
    await createDatabase();
    await useDatabase();
    await executeSqlFiles();
    await seedData(connection);
  } catch (error) {
    console.error('Error initializing database: ', error);
    connection.end();
  }
};

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL server');
  initializeDatabase();
});

export default connection;

