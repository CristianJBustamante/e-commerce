import { productsModel } from "./models/productsModel.js"; // Asegúrate de que la ruta sea correcta

// Renderiza la vista realTimeProducts.handlebars con los productos
export const renderRealTimeProducts = async (req, res) => {
  try {
    const products = await productsModel.find(); // Obtiene todos los productos de la base de datos
    res.render('realTimeProducts', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
};