import express from 'express';
import {nanoid} from "nanoid";
import connectDB from "./src/config/mongo.config.js" ;
import UrlSchema from "./src/models/shortUrl.model.js";
import shortUrl from "./src/routes/shortUrl.route.js"
import dotenv from "dotenv";
import { handleRedirect } from './src/controllers/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';

dotenv.config();


const app=express();
//used for body parser or to read form data. 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// creating the url shorter 
app.use("/api",shortUrl);
//redirection 
app.get("/:id",handleRedirect);  

// Global error handling middleware
app.use(errorHandler);

app.listen(3000,()=>{
    connectDB();
    console.log("listening to port",3000);
})
