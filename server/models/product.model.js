import mongoose from "mongoose"
 const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number
 }, { timestamps: true })

 export const Product = mongoose.model("ProductSchema", ProductSchema)