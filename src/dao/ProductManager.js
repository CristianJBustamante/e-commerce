import { productsModel } from "./models/productsModel.js";

export class ProductManager{
    static async get(page=1, limit=5){
        return await productsModel.paginate({}, {lean:true, page, limit})
    }

    static async getBy(filtro={}){
        return await productsModel.findOne(filtro)
    }

    static async create(product){
        return await productsModel.create(product)
    }
}