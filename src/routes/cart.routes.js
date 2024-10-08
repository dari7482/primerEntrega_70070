import { Router } from "express"

import cartModel from '../models/cart.model.js'
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router()


router.get("/api/cart/:cid", async (req, res) => {
    console.log("10", req.params.cid)
    const cartId = req.params.cid

    try {
        let carts = await cartModel.findById(cartId)



        res.send(carts)
    } catch (error) {
        console.error(error)
    }
})


router.put("/api/carts/:cid", async (req, res) => {
    const product = req.body



    const cartid = req.params.cid
    if (!product) {
        res.send({ status: "error", error: "missing parameters" })
    }
    //const productSelected = await productModel.findById(prodid)

    const updatedCart = await cartModel.findById(cartid);

    const updateCartProduct = await cartModel.updateOne(
        { _id: updatedCart._id },
        { $push: { product } }


    )

    res.send({ result: "success", payload: updateCartProduct })



})


router.put("/api/carts/:cid/products/:pid", async (req, res) => {
    const product = req.body


    const cartid = req.params.cid
    const prodid = req.params.pid


    const cantidad = product.cantidad


    if (!product) {
        res.send({ status: "error", error: "missing parameters" })
    }
    //const productSelected = await productModel.findById(prodid)

    const cart = await cartModel.findById(cartid);


    const productID = cart.product.findIndex(p => p.id === prodid)


    if (productID === -1) {
        return res.status(404).send({ status: "error", error: "Product not found in cart" });
    }

    //cart.product[productID].cantidad = cantidad


    //const cart1 = cartModel.updateOne({ 'product.id': prodid }, { '$set': { 'cantidad.$': cantidad } })
    const updateCartProduct = await cartModel.updateOne(
        { _id: cartid, "product.id": prodid },
        { $set: { "product.$.cantidad": cantidad } }


    )



    res.send({ result: "success", payload: updateCartProduct })

})

router.delete("/api/carts/:cid/products/:pid", async (req, res) => {


    const cartid = req.params.cid
    const prodid = req.params.pid



    const cart = await cartModel.findById(cartid);
    const updatedCart = await cartModel.findByIdAndUpdate(
        cartid,
        { $pull: { product: { id: prodid } } },
        { new: true }
    );


    res.send({ result: "success", payload: updatedCart })

})

router.delete("/api/carts/:cid", async (req, res) => {
    //let { product } = req.body

    const cartid = req.params.cid
    //const prodid = req.params.pid


    //const cart = await cartModel.findById(cartid);
    const updatedCart = await cartModel.findByIdAndUpdate(
        cartid,
        { $set: { product: [] } },
        { new: true }
    );



    res.send({ result: "success", payload: updatedCart })
})




export default router
