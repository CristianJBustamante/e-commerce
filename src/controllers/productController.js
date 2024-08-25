const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');


const getAllProducts = (req, res) => {
  try{
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al leer el archivo de productos');
      }
  
      let products;
      try {
        products = JSON.parse(data);
      } catch (parseError) {
        return res.status(500).send('Error al parsear el archivo de productos');
      }
  
      const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
      res.json(products.slice(0, limit));
    });
  }catch(error){
    return res.status(500).send('Error con la lectura del archivo de Productos');
  }
};

const getProductById = (req, res) => {
  const productId = req.params.pid;

  try{
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
  }catch(error){
    return res.status(500).send('Error con la lectura del archivo de Productos');
  }

};

const createProduct = (req, res) => {
  try{
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al leer el archivo de productos');
      }
  
      let products = JSON.parse(data);
      const newProduct = req.body;
      newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  
      const validationError = validateProductData(newProduct);
      if (validationError) {
        return res.status(400).send(validationError);
      }
  
      products.push(newProduct);
  
      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error al guardar el producto');
        }
  
        res.status(201).json(newProduct);
      });
    });
  }catch(error){
    return res.status(500).send('Error con la lectura del archivo de Productos');
  }
};

const updateProduct = (req, res) => {

  const productId = req.params.pid;

  try{
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
  
      const productIndex = products.findIndex(p => p.id == productId);
      if (productIndex === -1) {
        return res.status(404).send('Producto no encontrado');
      }
  
      const updatedProduct = { ...products[productIndex], ...req.body };
  
      const validationError = validateProductData(updatedProduct, true);
      if (validationError) {
        return res.status(400).send(validationError);
      }
  
      products[productIndex] = updatedProduct;
  
      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error al guardar el producto actualizado');
        }
  
        res.json(updatedProduct);
      });
    });
  }catch(error){
    return res.status(500).send('Error con la lectura del archivo de Productos');
  }

};

const deleteProduct = (req, res) => {
  const productId = req.params.pid;
  
  try{
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
  
      const productIndex = products.findIndex(p => p.id == productId);
      if (productIndex === -1) {
        return res.status(404).send('Producto no encontrado');
      }
  
      products.splice(productIndex, 1);
  
      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error al eliminar el producto');
        }
  
        res.status(204).send();
      });
    });
  }catch(error){
    return res.status(500).send('Error con la lectura del archivo de Productos');
  }
};

const validateProductData = (product, isUpdate = false) => {
  const { title, description, code, price, status, stock, category, thumbnails } = product;

  if (!isUpdate) {
    // En la creación, todos los campos son obligatorios excepto thumbnails.
    if (!title || !description || !code || !price || !stock || !category) {
      return 'Todos los campos son obligatorios, excepto thumbnails.';
    }
  }

  if (title && typeof title !== 'string') {
    return 'Title debe ser una cadena de texto.';
  }

  if (description && typeof description !== 'string') {
    return 'Description debe ser una cadena de texto.';
  }

  if (code && typeof code !== 'string') {
    return 'Code debe ser una cadena de texto.';
  }

  if (price && (typeof price !== 'number' || price < 0)) {
    return 'Price debe ser un número mayor o igual a cero.';
  }

  if (stock && (typeof stock !== 'number' || stock < 0)) {
    return 'Stock debe ser un número mayor o igual a cero.';
  }

  if (status && typeof status !== 'boolean') {
    return 'Status debe ser un valor booleano.';
  }

  if (thumbnails && !Array.isArray(thumbnails)) {
    return 'Thumbnails debe ser un arreglo de cadenas de texto.';
  }

  if (category && typeof category !== 'string') {
    return 'Category debe ser una cadena de texto.';
  }

  return null;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};