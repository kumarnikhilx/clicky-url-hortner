import { generateNanoId } from "../utils/helper.js";

import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser=async(url)=>{

        const short_url=generateNanoId(8);
        const newUrl=await saveShortUrl(url,short_url,null );

   
        return short_url;

}
export const createShortUrl=async(url,userId,slug=null)=>{

         const shortUrl = slug || generateNanoId(7)
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This custom url already exists")

    await saveShortUrl(url,shortUrl,userId)
    return shortUrl

}