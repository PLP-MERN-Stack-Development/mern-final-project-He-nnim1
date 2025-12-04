const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');

// load env
dotenv.config();

// connect db
connectDB();

// init app
const app = express();

// middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend to access
  credentials: true
}));
app.use(express.json()); // parse json bodies

// routes
console.log('Loading authRoutes...');
app.use('/api/auth', require('./routes/authRoutes'));

console.log('Loading farmerRoutes...');
app.use('/api/farmers', require('./routes/farmerRoutes'));

console.log('Loading buyerRoutes...');
app.use('/api/buyers', require('./routes/buyerRoutes'));

console.log('Loading productRoutes...');
app.use('/api/products', require('./routes/productRoutes'));

console.log('Loading orderRoutes...');
app.use('/api/orders', require('./routes/orderRoutes'));

console.log('All routes loaded successfully!');

// health check
app.get('/', (req, res) => res.send('LimaMarket API is running'));

// error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
