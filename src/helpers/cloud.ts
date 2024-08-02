import {v2 as cloudinary, v2} from "cloudinary";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
console.log("secret", process.env.JWT_SECRET);
console.log(`MongoURI`, process.env.MONGOURI);
console.log('DB password', process.env.DB_PASSWORD);

const uploadFile = async (file: any, res: Response) => {
    try {
      const upload = await cloudinary.uploader.upload(file.path);
      return upload.secure_url;
    } catch (error) {
      return res.status(500).send(error);
    }
};

export default uploadFile;
