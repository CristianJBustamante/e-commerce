const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Routes

const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, ()=>{
    console.log('Server running on port ${PORT}');
})