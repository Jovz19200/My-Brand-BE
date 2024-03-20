import express from "express";
import { addComment, getComments } from "../controllers/commentController";
import { isLogged } from "../middlewares/isLogged";
const router = express.Router();

router.post('/:id/comments', isLogged, addComment)
router.get('/:id/comments', getComments)

export default router;