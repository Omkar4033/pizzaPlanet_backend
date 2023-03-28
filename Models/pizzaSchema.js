const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name:{type:String,required:false},
  toppings: { type: [String], required: false },
  varients:{type:[String],required:false,default:["small","medium","large"]},
  crust: { type: [String], required: false },
  size: { type: [String], required: false },
  prices: { type:[Object], required: false,default:[{"small":300,"medium":350,"large":400}] },
  category:{type:String,required:false,},
  description:{type:String,required:false,default:"Introducing our new BBQ Chicken Pizza! Our classic crust is smothered in tangy BBQ sauce and topped with tender chicken, sliced red onions, and gooey mozzarella cheese. Each bite is bursting with sweet and savory flavor, making this pizza a must-try for any BBQ lover. Plus, it's loaded with protein to keep you satisfied. Order now and experience the deliciousness for yourself!"},
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
