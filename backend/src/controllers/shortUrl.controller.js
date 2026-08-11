import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser, createShortUrl } from "../services/shortUrl.service.js";
import { BadRequestError, NotFoundError } from "../utils/ApiError.js";
import WrapAsync from "../utils/tryCatchWrapper.js";


export const createUrl = WrapAsync(async (req,res,next) => {
    const data = req.body
   
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrl(data.url,req.user._id,data.slug)
    }else{  
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})

});

export const handleRedirect= WrapAsync(async(req,res,next)=>{
    const {id}=req.params;
    const originalUrl=await getShortUrl(id);
    
    if (!originalUrl) {
        throw new NotFoundError("Short URL not found");
    }
    res.redirect(originalUrl); 
});


