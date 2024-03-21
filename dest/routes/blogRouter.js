"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_js_1 = require("../controllers/blogController.js");
const multer_js_1 = __importDefault(require("../helpers/multer.js"));
const isAdmin_js_1 = require("../middlewares/isAdmin.js");
const isLogged_js_1 = require("../middlewares/isLogged.js");
const router = express_1.default.Router();
router.get("/", blogController_js_1.getBlogs);
router.post("/", isAdmin_js_1.isAdmin, isLogged_js_1.isLogged, multer_js_1.default.single("image"), blogController_js_1.createBlog);
router.get("/:id", blogController_js_1.getBlogById);
router.put("/:id", isAdmin_js_1.isAdmin, isLogged_js_1.isLogged, multer_js_1.default.single("image"), blogController_js_1.updateBlog);
router.delete("/:id", isAdmin_js_1.isAdmin, isLogged_js_1.isLogged, blogController_js_1.deleteBlog);
exports.default = router;
