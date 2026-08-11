import UrlSchema from "../models/shortUrl.model.js";
export const saveShortUrl=async(orignalUrl,shortUrl,userId)=>{

    //two method to create document in MONGODB 
    //method one
    const newUrl=new UrlSchema({
        originalUrl:orignalUrl,
        shortUrl:shortUrl,
       
    });

    if(userId){
        newUrl.user_id=userId;
    }
    await newUrl.save();
    return newUrl;

    //method 2
    // const newUrl = await UrlSchema.create({
    //      originalUrl:url,
    //     shortUrl:short_url
    // });
}