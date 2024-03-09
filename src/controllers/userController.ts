import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database';

const SECRET_KEY = process.env.JWT_SECRET_KEY || ' '; // Replace with your secret key
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; // JWT expiration time

// Helper function to execute SQL queries asynchronously
const queryAsync = (query: string, values?: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
const UserController = {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Find user by username
      const query = 'SELECT * FROM users WHERE username = ?';
      db.query(query, [username], async (error, results) => {
        if (error) {
          console.error('Error occurred during login:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
          expiresIn: JWT_EXPIRATION,
        });

        return res.status(200).json({ token });
      });
    } catch (error) {
      console.error('Error occurred during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async signup(req: Request, res: Response) {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
      const existingUser = await queryAsync(checkUsernameQuery, [username]);
  
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
      await queryAsync(insertUserQuery, [username, hashedPassword, 'normal']);
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default UserController;
