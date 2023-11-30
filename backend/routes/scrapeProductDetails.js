import express from "express";

import getProductDetail from "../controllers/scrapeProductDetails.js";

const router = express.Router();

router.get("/", getProductDetail);

export default router;
