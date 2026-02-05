import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";
import Paymentroutes from "./routes/payment.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5004;

//crearting an intsance for razorPay....
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//routes..
app.use("/api/payment", Paymentroutes);

app.listen(PORT, () => {
  console.log(`✅Payment service is running at => http://localhost:${PORT}`);
});
