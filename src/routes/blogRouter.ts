
import express from "express";

import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController";
import upload from "../helpers/multer";
import { isAdmin } from "../middlewares/isAdmin";
import { isLogged } from "../middlewares/isLogged";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", isAdmin, upload.single("image"), createBlog);
router.get("/:id", getBlogById);
router.put("/:id", isAdmin,upload.single("image"), updateBlog);
router.delete("/:id", isAdmin, deleteBlog);

export default router;
