# E-commerce Backend

Este proyecto es un backend simple para una aplicación de e-commerce, desarrollado utilizando Node.js y Express. El servidor permite gestionar productos y carritos de compras, con persistencia de datos en archivos JSON.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript en el lado del servidor.
- **Express**: Framework web para Node.js, utilizado para crear el servidor y definir las rutas.
- **File System (fs)**: Módulo nativo de Node.js para manejar operaciones de lectura y escritura en archivos.
- **JavaScript**: Lenguaje de programación utilizado para desarrollar el backend.

## Funcionalidades

### Productos (`/api/products`)
- **GET /api/products**: Obtiene todos los productos. Permite limitar la cantidad de productos retornados usando `?limit`.
- **GET /api/products/:pid**: Obtiene un producto específico por su ID.
- **POST /api/products**: Agrega un nuevo producto. Todos los campos son obligatorios excepto `thumbnails`.
- **PUT /api/products/:pid**: Actualiza un producto existente por su ID. No se permite modificar el `id`.
- **DELETE /api/products/:pid**: Elimina un producto por su ID.

### Carritos (`/api/carts`)
- **POST /api/carts**: Crea un nuevo carrito.
- **GET /api/carts/:cid**: Obtiene los productos de un carrito específico por su ID.
- **POST /api/carts/:cid/product/:pid**: Agrega un producto a un carrito existente. Si el producto ya está en el carrito, se incrementa su cantidad.

## Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** (gestor de paquetes de Node.js)

## Instrucciones de Instalación y Ejecución

1. **Clonar el Repositorio**

   Clona este repositorio en tu máquina local utilizando Git.

   ```bash
   git clone https://github.com/tu-usuario/e-commerce-backend.git
   cd e-commerce-backend


Aquí tienes el contenido del README.md con los pasos completos para que puedas copiar y pegar todo de una vez:

markdown
Copiar código
# E-commerce Backend

Este proyecto es un backend simple para una aplicación de e-commerce, desarrollado utilizando Node.js y Express. El servidor permite gestionar productos y carritos de compras, con persistencia de datos en archivos JSON.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript en el lado del servidor.
- **Express**: Framework web para Node.js, utilizado para crear el servidor y definir las rutas.
- **File System (fs)**: Módulo nativo de Node.js para manejar operaciones de lectura y escritura en archivos.
- **JavaScript**: Lenguaje de programación utilizado para desarrollar el backend.

## Funcionalidades

### Productos (`/api/products`)
- **GET /api/products**: Obtiene todos los productos. Permite limitar la cantidad de productos retornados usando `?limit`.
- **GET /api/products/:pid**: Obtiene un producto específico por su ID.
- **POST /api/products**: Agrega un nuevo producto. Todos los campos son obligatorios excepto `thumbnails`.
- **PUT /api/products/:pid**: Actualiza un producto existente por su ID. No se permite modificar el `id`.
- **DELETE /api/products/:pid**: Elimina un producto por su ID.

### Carritos (`/api/carts`)
- **POST /api/carts**: Crea un nuevo carrito.
- **GET /api/carts/:cid**: Obtiene los productos de un carrito específico por su ID.
- **POST /api/carts/:cid/product/:pid**: Agrega un producto a un carrito existente. Si el producto ya está en el carrito, se incrementa su cantidad.

## Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** (gestor de paquetes de Node.js)

## Instrucciones de Instalación y Ejecución

1. **Clonar el Repositorio**

   Clona este repositorio en tu máquina local utilizando Git.

   ```bash
   git clone https://github.com/CristianJBustamante/e-commerce
   cd e-commerce

2. **Instalar Dependencias**

   Como la carpeta node_modules no está incluida en el repositorio, necesitas instalar las dependencias manualmente.

   ```bash
   npm install

3. **Inicializar el Proyecto**

   Ejecuta el servidor utilizando el siguiente comando:

   ```bash
   node src/index.js
   
4. **Probar el Proyecto**

   Puedes usar herramientas como Postman o Insomnia para probar los endpoints del servidor.
