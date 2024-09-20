import { Router } from 'express';
export const router=Router()

router.get('/products',(req,res)=>{

    res.setHeader('Content-Type','text/html')
    res.status(200).render("products")
})