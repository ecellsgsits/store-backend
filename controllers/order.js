import mongoose from "mongoose";
import Product from "../models/product.js";
import User from "../models/user.js";
import CartItem from "../models/cartItem.js";
import Order from "../models/order.js";

export function getAll(req, res) {
  Order.find({ uid: req.query.uid }).then((resp) => res.status(200).json(resp));
}

export function addOrder(req, res) {
  Order.create({
    uid: req.body.uid,
    cart: JSON.stringify(req.body.cart),
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.contact,
    transactionID: req.body.transactionID,
  }).then(() => {
    Order.find().then((resp) => res.status(200).json(resp));
  });
}
