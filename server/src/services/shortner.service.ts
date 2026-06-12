import {generateShortCode} from "../utils/utilities";
import {appConfig} from "../configs/app.config";
import * as urlModel from "../models/url.model";

export const shortenUrl = async (url: string) => {
    const shortCode = generateShortCode(appConfig.URL_DIGIT_NUMBER);
    const shortUrl = `${appConfig.BASE_SHORT_URL}/${shortCode}`;
    await urlModel.saveUrlMapping(shortCode, url);
    return shortUrl;
};

export const getOriginalURL = async (code: any)=>{
    const data = await urlModel.getOriginalUrl(code);
    return data;
}

export const getAllUrls = async ()=>{
    const data = await urlModel.getAllUrls();
    return data;
}