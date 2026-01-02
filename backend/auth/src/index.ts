import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Auth Service is running at Port:${Port}`);
});
