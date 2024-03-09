import bcrypt from 'bcrypt';
import mysql from 'mysql';

const seedAdminUser = async (db: mysql.Connection) => {
  try {
    // Check if admin user already exists
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, ['admin'], async (error: any, results: string | any[]) => {
      if (error) {
        console.error('Error occurred during seeding:', error);
        return;
      }

      if (results.length === 0) {
        // Create admin user
        const salts = 10;
        const hashedPassword = await bcrypt.hash('admin', salts); // Hash password
        const insertQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(insertQuery, ['admin', hashedPassword, 'admin'], (insertError: any) => {
          if (insertError) {
            console.error('Error seeding admin user:', insertError);
          } else {
            console.log('Admin user seeded successfully');
          }
        });
      } else {
        console.log('Admin user already exists');
      }
    });
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

export default seedAdminUser;
