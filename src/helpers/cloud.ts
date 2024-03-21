import {v2 as cloudinary, v2} from "cloudinary";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

const uploadFile = async (file: any, res: Response) => {
    try {
      const upload = await cloudinary.uploader.upload(file.path);
      return upload.secure_url;
    } catch (error) {
      return res.status(500).send(error);
    }
};

export default uploadFile;
