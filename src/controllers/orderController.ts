import { Request, Response } from 'express';
import db from '../database';
interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your user object structure
}
export const createOrder = (req: CustomRequest, res: Response) => {
  const userId = req.user.id;
  const { items } = req.body; // Assuming userId and items (array of { itemId, quantity }) are provided in the request body

  // Logic to create an order in the orders table
  const createOrderQuery = 'INSERT INTO orders (user_id) VALUES (?)';
  db.query(createOrderQuery, [userId], (createOrderError, createOrderResult) => {
    if (createOrderError) {
      console.error('Error creating order:', createOrderError);
      return res.status(500).send({ message: 'Internal server error' });
    }

    const orderId = createOrderResult.insertId;

    // Loop through each item in the order
    items.forEach(({ itemId, quantity }: any) => {
      // Check if the inventory is enough for the ordered quantity
      const checkInventoryQuery = 'SELECT inventory FROM grocery_items WHERE id = ?';
      db.query(checkInventoryQuery, [itemId], (checkInventoryError, inventoryResults) => {
        if (checkInventoryError) {
          console.error('Error checking inventory:', checkInventoryError);
          return res.status(500).send({ message: 'Internal server error' });
        }

        const availableInventory = inventoryResults[0].inventory;
        if (quantity > availableInventory) {
          return res.status(400).send({ message: `Not enough inventory for item ${itemId}` });
        }

        // Insert the item into the order_items table
        const insertOrderItemQuery = 'INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)';
        db.query(insertOrderItemQuery, [orderId, itemId, quantity], (insertOrderItemError) => {
          if (insertOrderItemError) {
            console.error('Error inserting order item:', insertOrderItemError);
            return res.status(500).send({ message: 'Error inserting order item' });
          }

          // Update the inventory of the grocery item
          const updatedInventory = availableInventory - quantity;
          const updateInventoryQuery = 'UPDATE grocery_items SET inventory = ? WHERE id = ?';
          db.query(updateInventoryQuery, [updatedInventory, itemId], (updateInventoryError) => {
            if (updateInventoryError) {
              console.error('Error updating inventory:', updateInventoryError);
              return res.status(500).send({ message: 'Error updating inventory' });
            }

            // If the last item is processed successfully, send the success response
            if (itemId === items[items.length - 1].itemId) {
              res.status(201).send({ message: 'Order created successfully', orderId });
            }
          });
        });
      });
    });
  });
};
