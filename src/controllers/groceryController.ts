import { Request, Response } from 'express';
import db from '../database';

const GroceryController = {
    async addGroceryItem (req: Request, res: Response) {
      const { name, price, inventory } = req.body;
    
      const insertItemQuery = 'INSERT INTO grocery_items (name, price, inventory) VALUES (?, ?, ?)';
      db.query(insertItemQuery, [name, price, inventory], (error, results) => {
        if (error) {
          console.error('Error adding grocery item:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'Grocery item added successfully', id: results.insertId });
        }
      });
    },

    async viewGroceryItems (req: Request, res: Response) {
      const selectItemsQuery = 'SELECT * FROM grocery_items';
      db.query(selectItemsQuery, (error, results) => {
        if (error) {
          console.error('Error viewing grocery items:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(200).json(results);
        }
      });
    },

    async removeGroceryItem (req: Request, res: Response) {
      const itemId = req.params.id;
    
      const deleteItemQuery = 'DELETE FROM grocery_items WHERE id = ?';
      db.query(deleteItemQuery, [itemId], (error) => {
        if (error) {
          console.error('Error removing grocery item:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(200).json({ message: 'Grocery item removed successfully' });
        }
      });
    },

    async updateGroceryItem (req: Request, res: Response) {
      const itemId = req.params.id;
      const { name, price, inventory } = req.body;
    
      const updateItemQuery = 'UPDATE grocery_items SET name = ?, price = ?, inventory = ? WHERE id = ?';
      db.query(updateItemQuery, [name, price, inventory, itemId], (error) => {
        if (error) {
          console.error('Error updating grocery item:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(200).json({ message: 'Grocery item updated successfully' });
        }
      });
    },
}

export default GroceryController;
