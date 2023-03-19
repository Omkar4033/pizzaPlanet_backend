const express = require('express');
const router = express.Router();
const Pizza = require('../Models/pizzaSchema');

// Get all pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific pizza by ID
router.get('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).send('Pizza not found');
    }
    res.json(pizza);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new pizza
router.post('/', async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    await pizza.save();
    res.json(pizza);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a specific pizza by ID
router.put('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pizza) {
      return res.status(404).send('Pizza not found');
    }
    res.json(pizza);
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
    }
    });
    
    // Delete a specific pizza by ID
    router.delete('/:id', async (req, res) => {
    try {
    const pizza = await Pizza.findByIdAndRemove(req.params.id);
    if (!pizza) {
    return res.status(404).send('Pizza not found');
    }
    res.send('Pizza deleted');
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
    }
    });
    
    module.exports = router;
