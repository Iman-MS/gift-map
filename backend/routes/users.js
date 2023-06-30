import express from "express";
import {
  getUsers,
  getUser,
  validateUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

// include other resource routers
import giftsRouter from "./gifts.js";

const router = express.Router();

// re-route into other resource routers
router.use("/:userId/gifts", giftsRouter);

router.route("/").get(getUsers);

router.route("/login").post(validateUser);

router.route("/create").post(createUser);

router.route("/:userId").put(updateUser).delete(deleteUser).get(getUser);

export default router;
