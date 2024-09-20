const ulProducts=document.querySelector("ul")

const getProducts=async()=>{
    let params=new URLSearchParams(location.search)
    let page=params.get("page")
    if(!page || isNaN(Number(page))){
        page=1
    }

    let respuesta=await fetch(`/api/products?page=${page}`)
    let data=await respuesta.json()
    console.log(data)


    data.products.forEach(p=>{
        let liProduct=document.createElement("li")
        liProduct.textContent=`${p.title} - `
        ulProducts.append(liProduct)
    })

    const aFirstPage=document.createElement("a")
    aFirstPage.textContent=`Pág.1`
    aFirstPage.href=`/products?page=1`
    document.body.append(aFirstPage)

    const aPrevPage=document.createElement("a")
    aPrevPage.textContent=`Pág.Ant.`
    aPrevPage.href=`/products?page=${data.prevPage}`
    if(!data.hasPrevPage){
        aPrevPage.classList.add("disabled")
    }
    document.body.append(aPrevPage)

    const aNextPage=document.createElement("a")
    aNextPage.textContent=`Pág.Sig.`
    aNextPage.href=`/products?page=${data.nextPage}`
    if(!data.hasNextPage){
        aNextPage.classList.add("disabled")
    }
    document.body.append(aNextPage)

    const aLastPage=document.createElement("a")
    aLastPage.textContent=`Ulg.Pág`
    aLastPage.href=`/products?page=${data.totalPages}`
    document.body.append(aLastPage)

} 

getProducts();
