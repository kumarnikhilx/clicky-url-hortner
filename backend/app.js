import express from 'express';
import {nanoid} from "nanoid";
import connectDB from "./src/config/mongo.config.js" ;
import UrlSchema from "./src/models/shorturl.model.js"
import dotenv from "dotenv";

dotenv.config();


const app=express();
//used for body parser or to read form data. 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// creating the url shorter 
app.post("/api/create",async(req,res)=>{

    const {url} = req.body;
    console.log(url);
    
    const short_url=nanoid(8);

    //two method to create document in MONGODB 
    //method one
    // const newUrl=new UrlSchema({
    //     originalUrl:url,
    //     shortUrl:short_url
    // });
    // await newUrl.save();

    //method 2
    const newUrl = await UrlSchema.create({
         originalUrl:url,
        shortUrl:short_url

    });
        return res.status(200).send(newUrl);

    



})

app.listen(3000,()=>{
    connectDB();
    console.log("listening to port",3000);
})
