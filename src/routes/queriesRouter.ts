import express from "express";
import { createQuery, getQuerries, deleteQuerry } from "../controllers/queriesController";
const router = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import { isLogged } from "../middlewares/isLogged";

router.post("/queries", createQuery);
router.get("/queries", isLogged, isAdmin, getQuerries);
router.delete("/queries/:id", isLogged, isAdmin, deleteQuerry);

export default router;