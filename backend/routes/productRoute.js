import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {
    addProduct,
    listProducts,
    deleteProduct,
    singleProductInfo,
} from "../controllers/productController.js";

// create product router
const productRouter = express.Router();

productRouter.post(
    "/add",
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]),
    addProduct
);
productRouter.get("/list", adminAuth, listProducts);
productRouter.get("/single", adminAuth, singleProductInfo);
productRouter.post("/delete", adminAuth, deleteProduct);

export default productRouter;
