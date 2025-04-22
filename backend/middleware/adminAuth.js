// middleware for admin authentication
import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        // get token from request header
        const { token } = req.headers;

        // check if token is provided
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized access" });
        }
        // decode token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (
            decodedToken !==
            process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
        ) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized access" });
        }
        // move to next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default adminAuth;
