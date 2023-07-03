import express from "express";
import {
  getGifts,
  getGift,
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

router.route("/").get(
  advancedResults(Gift, {
    path: "user",
    select: "name",
  }),
  getGifts
);
router
  .route("/:giftId")
  .get(getGift)
  .put(protect, updateGift)
  .delete(protect, deleteGift);
router.route("/create").post(protect, createGift);
router.route("/:giftId/photo").put(protect, giftPhotoUpload);

export default router;
