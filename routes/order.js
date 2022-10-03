import express from "express";
import * as orderController from "../controllers/order.js";

const router = express.Router();

router.post("/addOrder", orderController.addOrder);
router.get("/getAll", orderController.getAll);

export default router;
