import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import { protect } from "../middleware/auth.js";

import advancedResults from "../middleware/advancedResults.js";

import User from "../models/User.js";

// // include other resource routers
import giftsRouter from "./gifts.js";

const router = express.Router();

// // re-route into other resource routers
router.use("/:userId/gifts/", giftsRouter);

router.route("/all").get(advancedResults(User, "gifts"), getUsers);

router.route("/create").post(createUser);

router
  .route("/")
  .put(protect, updateUser)
  .delete(protect, deleteUser)
  .get(protect, getUser);

export default router;
