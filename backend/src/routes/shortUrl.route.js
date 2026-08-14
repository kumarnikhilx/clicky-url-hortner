import express from 'express';
import { createUrl } from "../controllers/shortUrl.controller.js";
import { urlLimiter } from "../utils/rateLimiter.js";

const router = express.Router();

// Apply urlLimiter strictly to the URL creation endpoint
router.post("/create", urlLimiter, createUrl);

export default router;