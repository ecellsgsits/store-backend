import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  uid: String,
  cart: String,
  name: String,
  mobile: Number,
  email: String,
  transcationID: String,
});

const Order = new mongoose.model("Order", orderSchema);
export default Order;
