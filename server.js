const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const striperoutes=require('./Routes/stripe-routes');
// Set up API routes
const pizzaRouter = require('./Routes/Pizza');
const orderRouter = require('./Routes/Order');
const userRouter =require('./Routes/User')
const cors =require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(cors());
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Connect to MongoDB database
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/pizza-maker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/pizzas', pizzaRouter);
app.use('/api/users', userRouter);
app.use('/api/orders',orderRouter);
app.use('/api/stripes',striperoutes); 
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
