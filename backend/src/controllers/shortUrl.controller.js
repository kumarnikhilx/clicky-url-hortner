import { getShortUrl } from "../dao/shortUrl.js";
import { createshortUrl } from "../services/shortUrl.service.js";
import { BadRequestError, NotFoundError } from "../utils/ApiError.js";
import WrapAsync from "../utils/tryCatchWrapper.js";


export const createUrl = WrapAsync(async (req,res,next) => {
    const {url} = req.body;
    console.log(url);
    
    if (!url) {
        throw new BadRequestError("URL is required");
    }

    const newUrl = await createshortUrl(url);
    return res.status(200).send(process.env.APP_URL+newUrl.shortUrl);

});

export const handleRedirect=WrapAsync(async(req,res,next)=>{
    const {id}=req.params;
    const originalUrl=await getShortUrl(id);
    
    if (!originalUrl) {
        throw new NotFoundError("Short URL not found");
    }
    res.redirect(originalUrl); 
});
