import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { CheckOut, paymentVerification } from "../controller/payment.js";

const router = express.Router();

router.post("/checkout", isAuthenticated, CheckOut);
router.post("/verifyPayment", isAuthenticated, paymentVerification);

export default router;
