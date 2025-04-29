import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

// App config
const app = express();
const PORT = process.env.PORT;
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// APi endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
