import mongoose from "mongoose";

const shortUrlSchema= new mongoose.Schema({
    originalUrl: {
        type:String,
        required:true
    },
    shortUrl: {
        type:String,
        required:true,
        index:true,
        unique:true
    }, 
    click:{
        type:Number,
        required:true,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    

});

const ShortUrl=mongoose.model("ShortUrl",shortUrlSchema);
export default ShortUrl;