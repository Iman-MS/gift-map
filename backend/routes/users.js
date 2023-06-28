import express from "express";
import {
  validateUser,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/users.js";
const router = express.Router();

router.route("/login").post(validateUser);

router.route("/create").post(createUser);

router.route("/:userId").put(updateUser).delete(deleteUser).get(getUser);

export default router;
