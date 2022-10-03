import express from "express";
import * as authController from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/verifyToken", authController.verifyToken);

export default router;
