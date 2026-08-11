import express from 'express';
import {nanoid} from "nanoid";
import connectDB from "./src/config/mongo.config.js" ;
import UrlSchema from "./src/models/shortUrl.model.js";
import shortUrl from "./src/routes/shortUrl.route.js"
import dotenv from "dotenv";

dotenv.config();


const app=express();
//used for body parser or to read form data. 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// creating the url shorter 
app.use("/api",shortUrl);
//redirection 

app.get("/:id",async(req,res)=>{
    const {id}=req.params;
    const url=await UrlSchema.findOne({ shortUrl:id });
    if(!url){
        return res.status(404).send("Url not found");
    }
    url.click++;
    await url.save();
    res.redirect(url.originalUrl); // its redirecting the mapped shortUrl with the origalUrl.
})  

app.listen(3000,()=>{
    connectDB();
    console.log("listening to port",3000);
})
