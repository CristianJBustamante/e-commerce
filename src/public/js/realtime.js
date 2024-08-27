const socket = io();

socket.on('productList', (products) => {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.id} - ${product.title} - $${product.price}`;
    productList.appendChild(li);
  });
});

function agregarProducto() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const code = document.getElementById('code').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;
  const category = document.getElementById('category').value;

  if (!title) { alert('Ingrese un título'); return; }
  if (!description) { alert('Ingrese una descripción'); return; }
  if (!code) { alert('Ingrese un código'); return; }
  if (!price) { alert('Ingrese el precio'); return; }
  if (!stock) { alert('Ingrese el stock'); return; }
  if (!category) { alert('Ingrese una categoría'); return; }

  socket.emit('addProduct', { title, description, code, price, stock, category });
}

function eliminarProducto() {
  const id = document.getElementById('deleteId').value;
  socket.emit('deleteProduct', id);
}

function modificarProducto() {
  const id = document.getElementById('updateId').value;
  const title = document.getElementById('newTitle').value;
  const price = document.getElementById('newPrice').value;
  const stock = document.getElementById('newStock').value;

  if (!id) {
    alert('El ID del producto es requerido para modificar.');
    return;
  }

  const updatedProduct = { id };

  if (title) updatedProduct.title = title;
  if (price) updatedProduct.price = price;
  if (stock) updatedProduct.stock = stock;

  console.log(updatedProduct);

  socket.emit('updateProduct', updatedProduct, (response) => {
    if (response.error) {
      alert(response.error);
    } else {
      alert('Producto modificado con éxito');
      document.getElementById('updateId').value = "";
      document.getElementById('newTitle').value = "";
      document.getElementById('newPrice').value = "";
      document.getElementById('newStock').value = "";
    }
  });
}
