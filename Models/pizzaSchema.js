const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name:{type:String,required:false},
  toppings: { type: [String], required: false },
  varients:{type:[String],required:false},
  crust: { type: [String], required: false },
  size: { type: [String], required: false },
  prices: { type:[Object], required: false },
  category:{type:String,required:false},
  description:{type:String,required:false},
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
