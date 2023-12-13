import { Router } from "express";
import { registerUser, loginUser } from "../controller/authController.js";

//-------------- ROUTING OBJECT-----------
const router = Router();

//-------------- ROUTING-----------

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
