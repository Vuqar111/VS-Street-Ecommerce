import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import couponRouter from "./routers/couponRouter.js";
import seasonRouter from "./routers/seasonRouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://vsfashion:vsfashion@cluster0.eeg2z.mongodb.net/vsfashion?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/seasons", seasonRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send("sb");
});
app.get("/api/config/google", (req, res) => {
  res.send("");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.get("/", (req, res) => {
  res.send("Server vallah   is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Serve at deqiq  http://localhost:${port}`);
});
