# 💳 Payment Service

Payment Service handles subscription payments for users using **Razorpay**. It provides endpoints for creating orders, verifying payments, and updating user subscriptions.

---

## **Tech Stack**

- Node.js, Express.js
- PostgreSQL
- Razorpay
- dotenv for environment variables
- CORS for cross-origin requests

---

## **Environment Variables**

Create a `.env` file in the root directory with the following variables:

```env
PORT=5004
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
DATABASE_URL=your_postgres_connection_string
```
