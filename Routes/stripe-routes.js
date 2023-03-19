const express = require('express');
const router = express.Router();
const Order = require('../Models/orderSchema');
const stripe=require("stripe")("sk_test_51MfQSHSBGOkkt5PzJMYF7X69preMido2X8MsPmzoaXRjCqfqV08zhYblSetxbskZLNhLNZTp5DrXz2cGD6coIyBl00Y5UXdy5K");
const { v4: uuidv4 } = require('uuid');

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

  // DELETE an order by ID


  module.exports = router;
