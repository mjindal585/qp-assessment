import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../database';

interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your user object structure
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
        // Check if the request has a valid JWT token in the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    // Verify the JWT token
    const secret: string = process.env.JWT_SECRET_KEY || ' ';
    const decoded: any = jwt.verify(token, secret);
    // Check if the decoded user exists in the database
    db.query(
      `SELECT * FROM users WHERE id = ?`,
      [decoded.id],
      (err: any, results: string | any[]) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: "Invalid user" });
        }

        // Add the decoded user object to the request for use in route handlers
        req.user = results[0];

        // Proceed to the next middleware or route handler
        next();
      }
    );
  } catch (error) {
    console.log('error --- ', error);
    // Token is invalid or expired
    return res.status(401).json({ message: "Invalid token" });
  }
};
