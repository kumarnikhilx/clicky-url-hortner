import { generateNanoId } from "../utils/helper.js";

import { saveShortUrl } from "../dao/shortUrl.js";

export const createshortUrlWithoutUser=async(url)=>{

        const short_url=generateNanoId(8);
        const newUrl=await saveShortUrl(url,short_url,null );

   
        return (newUrl);

}
export const createshortUrl=async(url,userId)=>{

        const short_url=generateNanoId(8);
         const newUrl=await saveShortUrl(url,short_url,userId );

   
        return (newUrl);

}