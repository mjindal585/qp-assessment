require("dotenv").config();
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import groceryRoutes from './routes/groceryRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

// Admin routes
app.use('/api/user', userRoutes);
app.use('/api/grocery', groceryRoutes);
app.use('/api/orders', orderRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
