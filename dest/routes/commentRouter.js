"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const isLogged_1 = require("../middlewares/isLogged");
const router = express_1.default.Router();
router.post('/:id/comments', isLogged_1.isLogged, commentController_1.addComment);
router.get('/:id/comments', commentController_1.getComments);
exports.default = router;