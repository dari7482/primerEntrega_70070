import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts' // Referencia a la colección de carritos
    }
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection

