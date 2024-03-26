import express from "express";
import { registerUser, getAllUsers, getUserById, deleteUser, updateUser, authUser } from "../controllers/userController";
const router = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import { isLogged } from "../middlewares/isLogged";

router.post("/", registerUser);
router.get("/", isLogged, isAdmin, getAllUsers);
router.get("/:id", isLogged, getUserById);
router.patch("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);
router.post("/auth", authUser);

export default router;