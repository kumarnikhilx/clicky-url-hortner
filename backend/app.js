import express from 'express';
import {nanoid} from "nanoid";
import connectDB from "./src/config/mongo.config.js" ;
import UrlSchema from "./src/models/shortUrl.model.js";
import shortUrl from "./src/routes/shortUrl.route.js"
import dotenv from "dotenv";
import cors from "cors";
import { handleRedirect } from './src/controllers/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import user_routes from "./src/routes/user.route.js"
import auth_routes from "./src/routes/auth.route.js"
import cookieParser from "cookie-parser"
import { attachUser } from './src/utils/attachUser.js';

dotenv.config();


const app=express();

// Trust proxy for Render reverse proxy (required for express-rate-limit & secure cookies)
app.set('trust proxy', 1);

// Configure CORS to allow requests from local dev, Vercel frontend, and custom FRONTEND_URL
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://clicky-chi.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or Postman)
        if (!origin) return callback(null, true);

        // Normalize origin (remove trailing slash)
        const cleanOrigin = origin.replace(/\/$/, '');

        // Check exact match or any .vercel.app deployment
        const isAllowed = allowedOrigins.some(o => o.replace(/\/$/, '') === cleanOrigin) ||
                          /\.vercel\.app$/.test(new URL(origin).hostname);

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

//used for body parser or to read form data. 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())

app.use(attachUser)


// creating the url shorter 
app.use("/api",shortUrl);
//redirection 
app.get("/:id",handleRedirect);  
app.use("/api",user_routes)
app.use("/api",auth_routes)

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB();
    console.log("listening to port",PORT);
})
