const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

const getAllProducts = (req, res) => {
  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer el archivo de productos');
    }

    let products;
    try {
      products = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send('Error al parsear el archivo de productos');
    }

    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
  });
};

const getProductById = (req, res) => {
  const productId = req.params.pid;

  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer el archivo de productos');
    }

    let products;
    try {
      products = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send('Error al parsear el archivo de productos');
    }

    const product = products.find(p => p.id == productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    res.json(product);
  });
};

const createProduct = (req, res) => {
  const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).send('All fields except thumbnails are required');
  }

  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading products file');
    
    const products = JSON.parse(data);
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    };
    
    products.push(newProduct);
    fs.writeFile(productsFilePath, JSON.stringify(products), err => {
      if (err) return res.status(500).send('Error writing products file');
      res.status(201).json(newProduct);
    });
  });
};

const updateProduct = (req, res) => {
  const productId = req.params.pid;
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading products file');
    
    let products = JSON.parse(data);
    const productIndex = products.findIndex(p => p.id == productId);
    if (productIndex === -1) return res.status(404).send('Product not found');
    
    const updatedProduct = {
      ...products[productIndex],
      title: title ?? products[productIndex].title,
      description: description ?? products[productIndex].description,
      code: code ?? products[productIndex].code,
      price: price ?? products[productIndex].price,
      status: status ?? products[productIndex].status,
      stock: stock ?? products[productIndex].stock,
      category: category ?? products[productIndex].category,
      thumbnails: thumbnails ?? products[productIndex].thumbnails
    };

    products[productIndex] = updatedProduct;
    fs.writeFile(productsFilePath, JSON.stringify(products), err => {
      if (err) return res.status(500).send('Error writing products file');
      res.json(updatedProduct);
    });
  });
};

const deleteProduct = (req, res) => {
  const productId = req.params.pid;

  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading products file');
    
    let products = JSON.parse(data);
    products = products.filter(p => p.id != productId);
    
    fs.writeFile(productsFilePath, JSON.stringify(products), err => {
      if (err) return res.status(500).send('Error writing products file');
      res.status(204).send();
    });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};