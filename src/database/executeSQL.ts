import mysql from 'mysql';
import fs from 'fs/promises';
import path from 'path';

const executeSQL = async (db: mysql.Connection) => {
  try {
    const sqlFolderPath = path.join(__dirname, 'sql'); // Assuming SQL files are stored in a 'sql' folder in the same directory as this script
    const files = await fs.readdir(sqlFolderPath);

    // Sort files in ascending order
    files.sort((a, b) => {
      const aNumber = parseInt(a.split('.')[0]);
      const bNumber = parseInt(b.split('.')[0]);
      return aNumber - bNumber;
    });

    for (const file of files) {
      const filePath = path.join(sqlFolderPath, file);
      const sqlQuery = await fs.readFile(filePath, 'utf8');
      await new Promise<void>((resolve, reject) => {
        db.query(sqlQuery, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log(`SQL script ${file} executed successfully`);
            resolve();
          }
        });
      });
    }
  } catch (error) {
    console.error('Error executing scripts:', error);
  }
};

export default executeSQL;
