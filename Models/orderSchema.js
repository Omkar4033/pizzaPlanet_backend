const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{
    type:String,
    required:true,
  },
  userId:{
    type:String,
    required:true
  },
  orderItems:[],
  Address:{
    type:String,
    required:false
  },
  totalPrice: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    default:"new",
    required:false,
  },
  transactionId:{
    type:String,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
