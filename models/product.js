import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  img: String,
  quantity: Number,
  price: Number,
  colors: [String],
  sizes: [String],
});

const Product = new mongoose.model("Product", productSchema);
export default Product;
