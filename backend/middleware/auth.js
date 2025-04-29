// authenticate user middleware
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    // get user token
    const { token } = req.headers;

    if (!token) {
        return res.json({
            success: false,
            message: "Unathorized! Login again",
        });
    }

    // decode token if available
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
