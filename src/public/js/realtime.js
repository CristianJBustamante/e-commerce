const socket = io();

socket.on('productList', (data) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    console.log(data);

    data.products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.code} - ${product.title} - $${product.price}`;
      
      const button = document.createElement('button');
      button.textContent = 'Eliminar';
      button.style.marginLeft = '10px';
      button.setAttribute('data-id', product._id);
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        deleteProduct(productId); 
      });
  
      li.appendChild(button);
      productList.appendChild(li);
    });
  
    createPaginationLinks(data);
  });
  
  const createPaginationLinks = (data) => {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; 
  
    const aFirstPage = document.createElement('a');
    aFirstPage.textContent = 'Pág. 1';
    aFirstPage.href = `?page=1`;
    paginationContainer.appendChild(aFirstPage);
  
    const aPrevPage = document.createElement('a');
    aPrevPage.textContent = 'Pág. Ant.';
    aPrevPage.href = `?page=${data.prevPage}`;
    if (!data.hasPrevPage) {
      aPrevPage.classList.add('disabled');
    }
    paginationContainer.appendChild(aPrevPage);
  
    const aNextPage = document.createElement('a');
    aNextPage.textContent = 'Pág. Sig.';
    aNextPage.href = `?page=${data.nextPage}`;
    if (!data.hasNextPage) {
      aNextPage.classList.add('disabled');
    }
    paginationContainer.appendChild(aNextPage);
  
    const aLastPage = document.createElement('a');
    aLastPage.textContent = `Ulg. Pág (${data.totalPages})`;
    aLastPage.href = `?page=${data.totalPages}`;
    paginationContainer.appendChild(aLastPage);
  };
  
  const deleteProduct = (productId) => {
    socket.emit('deleteProduct', productId); 
  };
  
  document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      event.preventDefault(); 
      const urlParams = new URLSearchParams(event.target.href.split('?')[1]);
      const page = urlParams.get('page');
  
      socket.emit('getProductsByPage', { page });
    }
  });