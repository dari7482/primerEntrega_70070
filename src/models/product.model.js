import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


/*const mongoosePaginate = require("mongoose-paginate-v2")*/
const productCollection = "products"

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 10000 },
    price: { type: Number, required: true, max: 100000 },
    stock: { type: Number, required: true, max: 1000 },
    description: { type: String, required: true, max: 100 },
    cantidad: { type: Number, required: true, max: 500 },
    thumbnail: { type: String }

})


productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema)

export default productModel
