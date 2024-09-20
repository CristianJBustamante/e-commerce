import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { connDB } from './connDB.js';
import { config } from './config/config.js';
import { engine } from 'express-handlebars';


import { router as productsRouter } from './routes/productRouter.js';
import { router as cartsRouter } from './routes/cartsRouter.js';
import { router as vistaProductRouter } from './routes/vistaProductRouter.js';

const PORT=config.PORT;

const app=express();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de tener la carpeta 'views'


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", vistaProductRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

connDB()