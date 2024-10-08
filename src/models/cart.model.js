import mongoose from "mongoose"

const cartCollection = "carts"


const cartSchema = new mongoose.Schema({
    product: {
        type: Array,
        default: []
    }

})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel
