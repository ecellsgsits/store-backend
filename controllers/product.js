import mongoose from "mongoose";
import Product from "../models/product.js";
import User from "../models/user.js";
import CartItem from "../models/cartItem.js";

export async function getCartTotal(req, res) {
  const userId = mongoose.Types.ObjectId(req.query.uid);
  User.find({ _id: userId })
    .populate("cart")
    .then(([user]) => {
      let total = 0;
      user.cart.forEach((item) => {
        total += item.total;
      });
      res.status(200).json(total);
    });
}

export function removeFromCart(req, res) {
  const userId = mongoose.Types.ObjectId(req.query.uid);
  const currentItemId = mongoose.Types.ObjectId(req.query.id);
  User.find({ _id: userId }).then(([user]) => {
    const updatedCart = user.cart.filter(
      (itemId) => !itemId.equals(currentItemId)
    );
    user.cart = updatedCart;
    user
      .save()
      .then((user) => user.populate("cart"))
      .then((usr) => res.status(200).json(usr["cart"]));
  });
}

export async function addToCart(req, res) {
  const { pid, uid, qty, color, size } = req.query;
  const [product] = await Product.find({ _id: mongoose.Types.ObjectId(pid) });
  const cartItem = await CartItem.create({
    name: product.name,
    img: product.img,
    quantity: qty,
    price: product.price,
    color,
    size,
    total: qty * product.price,
  });
  const [user] = await User.find({ _id: mongoose.Types.ObjectId(uid) });
  user.cart.push(cartItem._id);
  await user.save();
  user.populate("cart").then((usr) => res.status(200).json(usr["cart"]));
}

export function getAllItems(req, res) {
  Product.find().then((items) => res.status(200).json(items));
}

export function findById(req, res) {
  Product.find({ _id: mongoose.Types.ObjectId(req.query.pid) }).then((item) =>
    res.status(200).json(item)
  );
}

export function create(req, res) {
  const { name, img, quantity, price, colors, sizes } = req.body;
  const total = price * quantity;
  const product = new Product({
    name,
    img,
    quantity,
    price,
    total,
    colors,
    sizes,
  });
  product.save().then(() => {
    Product.find().then((data) => {
      res.status(200).json(data);
    });
  });
}

export async function add_card(req, res) {
  const newItem = await Product.create(req.body);
  const current_user = await User.find({
    _id: mongoose.Types.ObjectId(req.query.uid),
  });
  current_user.cart.push(newItem._id);
  await current_user.save();
  const { cart } = await current_user.populate("Product");
  res.status(200).json(cart);
}
