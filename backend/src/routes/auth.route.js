import express from "express";
import { register_user, login_user, logout_user, get_current_user } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authLimiter } from "../utils/rateLimiter.js";

const router = express.Router();

// Apply authLimiter only to sensitive authentication operations (register and login)
router.post("/auth/register", authLimiter, register_user);
router.post("/auth/login", authLimiter, login_user);
router.post("/auth/logout", logout_user);
router.get("/auth/me", authMiddleware, get_current_user);

export default router;