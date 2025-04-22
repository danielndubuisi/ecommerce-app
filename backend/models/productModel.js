import mongoose from "mongoose";

// create product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
        required: true,
    },
    bestSeller: {
        type: Boolean,
    },
    date: {
        type: Number,
        default: Date.now,
        required: true,
    },
})

// create product model
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;