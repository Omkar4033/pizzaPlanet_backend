const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const striperoutes=require('./Routes/stripe-routes');
const pizzaRouter = require('./Routes/Pizza');
const orderRouter = require('./Routes/Order');
const userRouter =require('./Routes/User')
const cors =require('cors');
const app = express();
require('dotenv').config();


const port = process.env.PORT;
const mongourl=process.env.MONGODB_URI;

// Set up body-parser middleware
 app.use(bodyParser.json());
 app.use(cors());
 app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });



mongoose.set('strictQuery', false);
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

 app.use('/api/pizzas', pizzaRouter);
 app.use('/api/users', userRouter);
 app.use('/api/orders',orderRouter);
 app.use('/api/stripes',striperoutes); 
 // Start the server
 app.listen(port, () => {
   console.log(` New Server at port ${port}`);
 });
