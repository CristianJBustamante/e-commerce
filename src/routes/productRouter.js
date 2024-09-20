import { Router } from 'express';
import { ProductManager } from '../dao/ProductManager.js';
export const router=Router()

router.get('/',async(req,res)=>{
    let {page, limit}=req.query
    if(!page || isNaN(Number(page))){
        page=1
    }
    if(!limit || isNaN(Number(limit))){
        limit=5
    }

    try {
        let products=await ProductManager.get(page, limit)
        products.products=products.docs
        delete products.docs

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({...products});
    } catch (error) {
        return error;
    }
})

router.post("/", async(req, res)=>{
    let {code, descrip, price, stock}=req.body
    if(!code || !descrip || !price || !stock){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete todos los datos`})
    }

    try {
        let nuevoProducto=await ProductManager.create({code, descrip, price, stock})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({nuevoProducto});
    } catch (error) {
        return error;
    }
})