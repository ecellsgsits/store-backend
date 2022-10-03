import express from "express";
import * as productController from "../controllers/product.js";

const router = express.Router();
router.post("/create", productController.create);
router.get("/getAll", productController.getAllItems);
router.get("/findById", productController.findById);
router.get("/addToCart", productController.addToCart);
router.get("/removeFromCart", productController.removeFromCart);
router.get("/getCartTotal", productController.getCartTotal);

export default router;
