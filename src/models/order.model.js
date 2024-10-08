import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const orderCollection = "Orders";

const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    cart: {
        type: [],
        required: true
    },
    unavailableProducts: {
        type: [],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    purchaser: {
        type: String,



    }
});

orderSchema.pre('save', function (next) {

    if (!this.code) {
        this.code = uuidv4();
    }
    next();
});

const orderModel = mongoose.model(orderCollection, orderSchema);

export default orderModel;


