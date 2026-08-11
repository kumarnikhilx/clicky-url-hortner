import express from 'express';
import {createUrl} from "../controllers/shortUrl.controller.js"
const router =express.Router();

router.post("/create",createUrl);

export default router;