import { Router } from "express"
import cartModel from "../models/cart.model.js";
import orderModel from '../models/order.model.js'
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router()


router.post("/api/:cid/purchase", isAuthenticated, async (req, res) => {
    console.log('purchase')

    let carts = await cartModel.findById(req.params.cid)

    console.log(carts)




    const unavailableProducts = carts.product.filter(product => product.stock < product.cantidad);
    const availableProducts = carts.product.filter(product => product.stock >= product.cantidad);

    const totalAmount = carts.product.reduce((total, product) => {
        return total + (product.stock >= product.cantidad ? product.price * product.cantidad : 0);
    }, 0);

    console.log(carts.product)

    const newOrder = {
        cart: availableProducts,
        unavailableProducts: unavailableProducts,
        totalAmount: totalAmount,
        purchaser: req.session.user.email,
    }
    const result = await orderModel.create(newOrder)
    console.log(newOrder)
    res.json({ redirectUrl: `/api/order/${result.id}` })
})


router.get("/api/order/:idOrder", isAuthenticated, async (req, res) => {
    console.log(req.params.idOrder)
    let order = await orderModel.findById(req.params.idOrder)
    console.log(order)
    const orderObject = order.toObject();

    res.render('order', {
        ...orderObject,
        user: req.session.user
    })




})



export default router
