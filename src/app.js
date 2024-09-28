import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { connDB } from './connDB.js';
import { config } from './config/config.js';
import { engine } from 'express-handlebars';
import { Server } from "socket.io"


import { router as productsRouter } from './routes/productRouter.js';
import { router as cartsRouter } from './routes/cartsRouter.js';
import { router as vistaProductRouter } from './routes/vistaProductRouter.js';

import { ProductManager } from './dao/ProductManager.js'; // Asegúrate de importar correctamente


const PORT = config.PORT;

const app = express();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de tener la carpeta 'views'


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", vistaProductRouter)

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

const io = new Server(server);


// Conexión al socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    ProductManager.get(1) // Default a página 1
        .then(products => {
            socket.emit('productList', {
                products: products.docs,
                hasNextPage: products.hasNextPage,
                hasPrevPage: products.hasPrevPage,
                nextPage: products.nextPage,
                prevPage: products.prevPage,
                totalPages: products.totalPages
            });
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });

    socket.on('addProduct', (product) => {
        ProductManager.create(product)
            .then(newProduct => {
                ProductManager.get(1) // Default a página 1 después de agregar
                    .then(products => {
                        io.emit('productList', {
                            products: products.docs,
                            hasNextPage: products.hasNextPage,
                            hasPrevPage: products.hasPrevPage,
                            nextPage: products.nextPage,
                            prevPage: products.prevPage,
                            totalPages: products.totalPages
                        });
                    });
            })
            .catch(error => console.error('Error al agregar producto:', error));
    });

    socket.on('deleteProduct', async (id) => {
        try {
            await ProductManager.deleteById(id); 
            ProductManager.get(1) 
                .then(products => {
                    socket.emit('productList', {
                        products: products.docs,
                        hasNextPage: products.hasNextPage,
                        hasPrevPage: products.hasPrevPage,
                        nextPage: products.nextPage,
                        prevPage: products.prevPage,
                        totalPages: products.totalPages
                    });
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });
        } catch (error) {
            console.error('Error al eliminar producto', error);
        }
    });

    socket.on('getProductsByPage', async ({ page }) => {
        try {
            const products = await ProductManager.get(page);
            socket.emit('productList', {
                products: products.docs,
                hasNextPage: products.hasNextPage,
                hasPrevPage: products.hasPrevPage,
                nextPage: products.nextPage,
                prevPage: products.prevPage,
                totalPages: products.totalPages
            });
        } catch (error) {
            console.error('Error al obtener productos por página:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

connDB()