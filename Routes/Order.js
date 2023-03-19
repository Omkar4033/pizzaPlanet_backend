const express = require('express');
const router = express.Router();
const Order = require('../Models/orderSchema');
const stripe=require("stripe")("sk_test_51MfQSHSBGOkkt5PzJMYF7X69preMido2X8MsPmzoaXRjCqfqV08zhYblSetxbskZLNhLNZTp5DrXz2cGD6coIyBl00Y5UXdy5K");
const { v4: uuidv4 } = require('uuid');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single order by ID
// router.get('/:id', getOrder, async (req, res) => {
//   res.json(res.order);
// });

// CREATE a new order
router.post('/placeorder',async(req,res)=>{

  const { payment_method, subtotal,cartItems,curruser } = req.body;

  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(payment_method);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(subtotal*100),
      currency: "inr",
      payment_method_types: ["card"],
      payment_method: payment_method,
      confirm: true,
    });

    const newOrder= new Order({
      name:curruser.name,
      email:curruser.email,
      userId:curruser._id,
      orderItems:cartItems,
      Address:"omkar address",
      totalPrice:subtotal,
      status:"new",
      transactionId:payment_method
    
    })

    newOrder.save();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error.message });
  }
  })






// UPDATE an order by ID
// router.patch('/:id', getOrder, async (req, res) => {
//   const { user, pizzas, status, totalPrice } = req.body;
//   if (user) {
//     res.order.user = user;
//   }
//   if (pizzas) {
//     res.order.pizzas = pizzas;
//   }
//   if (status) {
//     res.order.status = status;
//   }
//   if (totalPrice) {
//     res.order.totalPrice = totalPrice;
//   }

//   try {
//     const updatedOrder = await res.order.save();
//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

router.delete('/:id', async (req, res) => {
  try {
     const deletedOrder= await Order.findByIdAndDelete(req.params.id);
     if(!req.params.id){
      return res.status(400).send({message:"wrong id"});
     }
     res.status(200).send(this.deletedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an order by ID
// async function getOrder(req, res, next) {
//   let order;
//   try {
//     order = await Order.findById(req.params.id).populate('user').populate('pizzas');
//     if (order == null) {
//       return res.status(404).json({ message: 'Cannot find order' });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
//   res.order = order;
//   next();
// }

module.exports = router;
