import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
  name: String,
  img: String,
  quantity: Number,
  price: Number,
  color: String,
  size: String,
  total: Number,
});

const CartItem = new mongoose.model("CartItem", cartItemSchema);
export default CartItem;
