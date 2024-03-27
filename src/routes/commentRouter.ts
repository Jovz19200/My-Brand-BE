import express from "express";
import { addComment, getComments } from "../controllers/commentController";
import { isLogged } from "../middlewares/isLogged";
import { Authorization } from "../middlewares/authorization";
const router = express.Router();

router.post('/:id/comments', isLogged, addComment)
router.get('/:id/comments', getComments)

export default router;