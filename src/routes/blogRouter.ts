
import express from "express";

import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";
import upload from "../helpers/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLogged } from "../middlewares/isLogged.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", isAdmin, isLogged, upload.single("image"), createBlog);
router.get("/:id", getBlogById);
router.put("/:id", isAdmin, isLogged,upload.single("image"), updateBlog);
router.delete("/:id", isAdmin, isLogged, deleteBlog);

export default router;
