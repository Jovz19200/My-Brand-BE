import express from "express";
import { registerUser, getAllUsers, getUserById, deleteUser, updateUser, authUser } from "../controllers/userController";
const router = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import { isLogged } from "../middlewares/isLogged";

router.post("/", registerUser);
router.get("/", isAdmin, getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/auth", authUser);

export default router;