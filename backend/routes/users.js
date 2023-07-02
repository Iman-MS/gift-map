import express from "express";
import {
  getUsers,
  getUser,
  validateUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

import advancedResults from "../middleware/advancedResults.js";

import User from "../models/User.js";

// include other resource routers
import giftsRouter from "./gifts.js";

const router = express.Router();

// re-route into other resource routers
router.use("/:userId/gifts", giftsRouter);

router.route("/").get(advancedResults(User, "gifts"), getUsers);

router.route("/login").post(validateUser);

router.route("/create").post(createUser);

router.route("/:userId").put(updateUser).delete(deleteUser).get(getUser);

export default router;
