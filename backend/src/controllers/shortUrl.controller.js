import { createshortUrl } from "../services/shortUrl.service.js";


export const createUrl = async (req,res) => {
    const {url} = req.body;
    console.log(url);
    
    const newUrl = await createshortUrl(url);
    return res.status(200).send(process.env.APP_URL+newUrl.shortUrl);

};
