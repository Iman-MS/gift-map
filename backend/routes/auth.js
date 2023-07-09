import express from "express";

import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetpassword,
} from "../controllers/auth.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetpassword);

export default router;
