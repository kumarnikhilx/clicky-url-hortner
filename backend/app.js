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

// Configure CORS to allow requests from the frontend with cookies
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
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

app.listen(3000,()=>{
    connectDB();
    console.log("listening to port",3000);
})
