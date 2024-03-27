import express from "express";
import { registerUser, getAllUsers, getUserById, deleteUser, updateUser, authUser } from "../controllers/userController";
const router = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import { isLogged } from "../middlewares/isLogged";
import { Authorization } from "../middlewares/authorization";

router.post("/", registerUser);
router.get("/", isLogged,getAllUsers);
router.get("/:id", isLogged, getUserById);
router.patch("/:id", isLogged, isAdmin, updateUser);
router.delete("/:id", isLogged, isAdmin, deleteUser);
router.post("/auth", authUser);

export default router;