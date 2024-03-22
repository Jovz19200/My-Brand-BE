"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const isAdmin_1 = require("../middlewares/isAdmin");
router.post("/", isAdmin_1.isAdmin, userController_1.registerUser);
router.get("/", isAdmin_1.isAdmin, userController_1.getAllUsers);
router.get("/:id", userController_1.getUserById);
router.patch("/:id", userController_1.updateUser);
router.delete("/:id", userController_1.deleteUser);
router.post("/auth", userController_1.authUser);
exports.default = router;
