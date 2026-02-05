import { instance } from "../index.js";
import { AuthenticatedRequest } from "../middleware/auth.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";

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
      amount: Number(119 * 100),
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
