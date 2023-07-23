import express from "express";
import {
  getGifts,
  getGift,
  getAllGifts,
  createGift,
  updateGift,
  deleteGift,
  giftPhotoUpload,
} from "../controllers/gifts.js";

import Gift from "../models/Gift.js";

import advancedResults from "../middleware/advancedResults.js";

import { protect } from "../middleware/auth.js";

// the mergeParams is because we are merging the url params(we are merging a param in the users to here)
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getGifts);

//getting all gifts for a certain user(the function is responsible for 2 routes one is getting all the gifts no matter the user and the second is getting the gifts for a certain user)
router.route("/all").get(
  advancedResults(Gift, {
    path: "user",
    select: "name",
  }),
  getAllGifts
);
router
  .route("/:giftId")
  .get(getGift)
  .put(protect, updateGift)
  .delete(protect, deleteGift);
router.route("/create").post(protect, createGift);
router.route("/:giftId/photo").put(protect, giftPhotoUpload);

export default router;
