const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../data/carts.json');
const productsFilePath = path.join(__dirname, '../data/products.json');

const createCart = (req, res) => {
  fs.readFile(cartsFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading carts file');
    
    const carts = JSON.parse(data);
    const newCart = {
      id: carts.length ? carts[carts.length - 1].id + 1 : 1,
      products: []
    };
    
    carts.push(newCart);
    fs.writeFile(cartsFilePath, JSON.stringify(carts), err => {
      if (err) return res.status(500).send('Error writing carts file');
      res.status(201).json(newCart);
    });
  });
};

const getCartById = (req, res) => {
  const cartId = req.params.cid;

  fs.readFile(cartsFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading carts file');
    
    const carts = JSON.parse(data);
    const cart = carts.find(c => c.id == cartId);
    if (!cart) return res.status(404).send('Cart not found');
    
    res.json(cart.products);
  });
};

const addProductToCart = (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  fs.readFile(cartsFilePath, 'utf-8', (err, cartsData) => {
    if (err) return res.status(500).send('Error reading carts file');
    
    const carts = JSON.parse(cartsData);
    const cart = carts.find(c => c.id == cartId);
    if (!cart) return res.status(404).send('Cart not found');
    
    fs.readFile(productsFilePath, 'utf-8', (err, productsData) => {
      if (err) return res.status(500).send('Error reading products file');
      
      const products = JSON.parse(productsData);
      const product = products.find(p => p.id == productId);
      if (!product) return res.status(404).send('Product not found');

      const cartProduct = cart.products.find(p => p.product == productId);
      if (cartProduct) {
        cartProduct.quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
      
      fs.writeFile(cartsFilePath, JSON.stringify(carts), err => {
        if (err) return res.status(500).send('Error writing carts file');
        res.json(cart);
      });
    });
  });
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart
};