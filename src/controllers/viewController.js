const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

// Renderiza la vista home.handlebars con los productos
const renderHome = (req, res) => {
  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer los productos');
    }

    let products;
    try {
      products = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send('Error al parsear los productos');
    }

    res.render('home', { products });
  });
};

// Renderiza la vista realTimeProducts.handlebars con los productos
const renderRealTimeProducts = (req, res) => {
  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer los productos');
    }

    let products;
    try {
      products = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send('Error al parsear los productos');
    }

    res.render('realTimeProducts', { products });
  });
};

module.exports = {
  renderHome,
  renderRealTimeProducts
};
