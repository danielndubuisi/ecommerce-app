import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async() => {
    // configure cloudinary and return "https" URLs by setting secure: true
    
    cloudinary.config({
    secure: true
    });
}

export default connectCloudinary;