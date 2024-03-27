import express from "express"
import { like, getLikes } from "../controllers/likeController"
const router = express.Router()
import { Authorization } from "../middlewares/authorization";
import { isLogged } from "../middlewares/isLogged";

router.post("/:id/likes", isLogged, like);
router.get("/:id/likes", getLikes);

export default router;