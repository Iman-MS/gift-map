import express from "express";
import { getGifts, getGift, createGift } from "../controllers/gifts.js";

// the mergeParams is because we are merging the url params(we are merging a param in the users to here)
const router = express.Router({ mergeParams: true });

router.route("/").get(getGifts);
router.route("/:giftId").get(getGift);
router.route("/create").post(createGift);

export default router;
