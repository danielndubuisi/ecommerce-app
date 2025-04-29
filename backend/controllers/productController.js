import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// function for adding a product
const addProduct = async (req, res) => {
    try {
        // get product data from request body
        const {
            name,
            price,
            description,
            category,
            subCategory,
            sizes,
            bestSeller,
        } = req.body;

        // get images from request (if image is provided)
        const image1 = req.files["image1"] && req.files["image1"][0];
        const image2 = req.files["image2"] && req.files["image2"][0];
        const image3 = req.files["image3"] && req.files["image3"][0];
        const image4 = req.files["image4"] && req.files["image4"][0];

        // store images in an array
        const images = [image1, image2, image3, image4].filter(
            (item) => item !== undefined
        );

        // upload images to cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        // set product data (it must match the product model)
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes), // convert string to array
            bestSeller: bestSeller === "true",
            date: Date.now(),
        };

        // save product to database
        const product = new productModel(productData);
        await product.save();

        res.status(200).json({
            success: true,
            message: "Product added successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// function for list products
const listProducts = async (req, res) => {
    try {
        // get all products from database
        const products = await productModel.find({});

        return res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// function for edit product
const editProduct = async (req, res) => {
    try {
        // get product id from request body
        const id = req.body.id;

        // check if product exists
        const exists = await productModel.findById(id);
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // get product data from request body
        const {
            name,
            price,
            description,
            category,
            subCategory,
            sizes,
            bestSeller,
        } = req.body;

        // get images from request (if image is provided)
        const image1 = req.files["image1"] && req.files["image1"][0];
        const image2 = req.files["image2"] && req.files["image2"][0];
        const image3 = req.files["image3"] && req.files["image3"][0];
        const image4 = req.files["image4"] && req.files["image4"][0];

        // store images in an array
        const images = [image1, image2, image3, image4].filter(
            (item) => item !== undefined
        );

        // upload images to cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        // set product data (it must match the product model)
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl.length > 0 ? imagesUrl : undefined,
            category,
            subCategory,
            sizes: JSON.parse(sizes), // convert string to array
            bestSeller: bestSeller === "true",
            date: Date.now(),
        };

        // update product in database
        await productModel.findByIdAndUpdate(id, productData);

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// function for delete product
const deleteProduct = async (req, res) => {
    try {
        // get product id from request body
        const id = req.body.id;

        // check if product exists
        const exists = await productModel.findById(id);
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // delete product from database
        await productModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted!",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// function for single product info
const singleProductInfo = async (req, res) => {
    try {
        // get product id from request body
        const { id } = req.body;

        // check if product exists
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export {
    addProduct,
    listProducts,
    deleteProduct,
    singleProductInfo,
    editProduct,
};
