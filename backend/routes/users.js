import express from "express";
import {
  getUsers,
  getUser,
  validateUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
const router = express.Router();

router.route("/").get(getUsers);

router.route("/login").post(validateUser);

router.route("/create").post(createUser);

router.route("/:userId").put(updateUser).delete(deleteUser).get(getUser);

export default router;
