import { cartsModel } from "./models/cartsModel.js";

export class CartManager{
    static async getById(id){
        return await cartsModel.findOne({id:id})
    }

    static async create(){
        return await cartsModel.create({products:[]})
    }

    static async update(id, cart){
        return await cartsModel.updateOne({id:id}, cart)
    }
}