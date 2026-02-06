import { instance } from "../index.js";
import { AuthenticatedRequest } from "../middleware/auth.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
export const CheckOut = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    if (!req.user) {
      throw new ErrorHandler(401, "No Valid User");
    }

    const user_id = req.user.user_id;

    const [user] = await sql`SELECT * FROM users WHERE user_id = ${user_id}`;

    // checking subscription time....
    const subscriptionTime = user?.subscription
      ? new Date(user.subscription).getTime()
      : 0;

    const now = Date.now();

    const isSubscribed = subscriptionTime > now;

    if (isSubscribed) {
      throw new ErrorHandler(400, "You already have an subscription");
    }

    const options = {
      amount: Number(299 * 100),
      currency: "INR",
      notes: {
        user_id: user_id.toString(),
      },
    };

    // creating order...
    const order = await instance.orders.create(options);

    res.status(201).json({
      order,
    });
  },
);

export const paymentVerification = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      const now = new Date();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const expiryDate = new Date(now.getTime() + thirtyDays);

      const [updateUser] =
        await sql`UPDATE users SET subscription = ${expiryDate} WHERE user_id = ${user?.user_id} RETURNING *`;

      res.json({
        message: "Subscription Purchased Successfully",
        updateUser,
      });
    } else {
      return res.status(400).json({
        message: "paymentFailed",
      });
    }
  },
);
