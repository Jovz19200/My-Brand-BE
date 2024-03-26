"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const multer_1 = __importDefault(require("../helpers/multer"));
const isAdmin_1 = require("../middlewares/isAdmin");
const router = express_1.default.Router();
router.get("/", blogController_1.getBlogs);
router.post("/", isAdmin_1.isAdmin, multer_1.default.single("image"), blogController_1.createBlog);
router.get("/:id", blogController_1.getBlogById);
router.put("/:id", isAdmin_1.isAdmin, multer_1.default.single("image"), blogController_1.updateBlog);
router.delete("/:id", isAdmin_1.isAdmin, blogController_1.deleteBlog);
exports.default = router;
