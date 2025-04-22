import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// token creation
const createToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
};

// route for user login
const loginUser = async (req, res) => {
    try {
        // get user data from request body
        const { email, password } = req.body;

        // check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found!",
            });
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // provide token to user
            const token = await createToken(user._id);
            res.json({
                success: true,
                token,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// route for user registration
const registerUser = async (req, res) => {
    try {
        // get user data from request body
        const { name, email, password } = req.body;

        // check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }

        // validate email and password format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please enter a strong password",
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // save to database
        const user = await newUser.save();

        // provide token to user
        const token = await createToken(user._id);
        res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// route for admin login
const adminLogin = async (req, res) => {
    try {
        // get user data from request body
        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            // provide token to user
            const token = jwt.sign(email + password, process.env.JWT_SECRET);

            res.json({
                success: true,
                token,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin };
