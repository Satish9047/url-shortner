import {generateShortCode} from "../utils/utilities";
import {appConfig} from "../configs/app.config";
import * as urlModel from "../models/url.model";

export const shortenUrl = async (url: string) => {
    const shortCode = generateShortCode(appConfig.URL_DIGIT_NUMBER);
    const shortUrl = `${appConfig.BASE_SHORT_URL}/${shortCode}`;
    console.log("original url", url)
    console.log("short url", shortUrl)
    await urlModel.saveUrlMapping(shortCode, url);
    return shortUrl;
};