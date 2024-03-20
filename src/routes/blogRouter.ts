
import express from "express";

import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";
import upload from "../helpers/multer.js";
const router = express.Router();

router.get("/", getBlogs);
router.post("/", upload.single("image"), createBlog);
router.get("/:id", getBlogById);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
