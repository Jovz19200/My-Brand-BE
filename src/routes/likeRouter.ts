import express from "express"
import { like, getLikes } from "../controllers/likeController"
const router = express.Router()
import { Authorization } from "../middlewares/authorization";

router.post("/:id/likes", Authorization, like);
router.get("/:id/likes", getLikes);

export default router;