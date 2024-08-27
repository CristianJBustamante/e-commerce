const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const viewRouter = require('./routes/viewRouter');
const productController = require('./controllers/productController');

const app = express();

app.use(express.json());


// Routes

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewRouter);

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
const PORT = 8080;
const server=app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
const io = socketIo(server);

// Conexión al socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Enviar la lista actual de productos al cliente cuando se conecta
    productController.getAllProducts({ query: {} }, {
        json: (products) => {
            socket.emit('productList', products);
        }
    });

    socket.on('addProduct', (product) => {
        productController.createProduct({ body: product }, {
            status: () => ({ json: (newProduct) => io.emit('productList', [...products, newProduct]) })
        });
    });

    socket.on('deleteProduct', (id) => {
        productController.deleteProduct({ params: { pid: id } }, {
            status: (code) => ({
                send: () => {
                    if (code === 204) {
                        productController.getAllProducts({ query: {} }, {
                            json: (products) => io.emit('productList', products)
                        });
                    }
                }
            })
        });
    });

    // socket.on('updateProduct', (updatedProduct) => {
    //     productController.updateProduct({ params: { pid: updatedProduct.id }, body: updatedProduct }, {
    //         json: () => {
    //             productController.getAllProducts({ query: {} }, {
    //                 json: (products) => io.emit('productList', products)
    //             });
    //         }
    //     });
    // });

    socket.on('updateProduct', (updatedProduct, callback) => {
        productController.updateProduct(
            { params: { pid: updatedProduct.id }, body: updatedProduct },
            {
                json: (data) => {
                    productController.getAllProducts({ query: {} }, {
                        json: (products) => {
                            io.emit('productList', products);
                            callback({ success: true });
                        }
                    });
                },
                status: (code) => ({
                    send: (message) => callback({ error: message, status: code })
                })
            }
        );
    });
});