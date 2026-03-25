const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const dataPath = path.join(__dirname, '../products.json');

// Helper to read data
const readProducts = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Helper to write data
const writeProducts = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST add a product
router.post('/', async (req, res) => {
  try {
    const { name, category, image, description, benefits, ingredients, usage, variants } = req.body;
    
    const products = await readProducts();
    const newProduct = {
      id: uuidv4(),
      name,
      category,
      image,
      description,
      benefits: benefits || [],
      ingredients: ingredients || [],
      usage,
      variants: variants || []
    };
    
    products.push(newProduct);
    await writeProducts(products);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// PUT update a product
router.put('/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const index = products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    
    products[index] = { ...products[index], ...req.body, id: req.params.id };
    await writeProducts(products);
    
    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    let products = await readProducts();
    const initialLength = products.length;
    products = products.filter(p => p.id !== req.params.id);
    
    if (products.length === initialLength) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await writeProducts(products);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
