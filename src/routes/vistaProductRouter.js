import { Router } from 'express';
export const router=Router()
import { renderRealTimeProducts } from '../dao/ViewManager.js';

router.get('/products',(req,res)=>{

    res.setHeader('Content-Type','text/html')
    res.status(200).render("products")
})

router.get('/realTimeProducts',(req,res)=>{

    res.setHeader('Content-Type','text/html')
    res.status(200).render("realTimeProducts")
})

// router.get('/realtimeproducts', renderRealTimeProducts);