import WrapAsync from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register_user = WrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const { token, user } = await registerUser(name, email, password);
    
    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({ message: "User registered successfully", user });
});

export const login_user = WrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    
    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "User logged in successfully", user });
});

export const logout_user = WrapAsync(async (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).json({ message: "User logged out successfully" });
});

export const get_current_user = WrapAsync(async (req, res) => {
    const user = req.user; // populated by authMiddleware or attachUser
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "success", user });
});