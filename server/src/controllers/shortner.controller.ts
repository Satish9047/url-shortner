import { Request, Response } from "express";
import { ApiResponse, ApiError } from "../utils/apiResponse.utils";
import * as urlShortnerService from "../services/shortner.service";

export const shortUrlHandler = async (req: Request, res: Response) => {
    const { url }: { url: string } = req.body;
    const data = await urlShortnerService.shortenUrl(url);
    res.json(new ApiResponse(200, "URL shortened successfully", data));
}

export const listUrlsHandler = async (req: Request, res: Response) => {
    const data = await urlShortnerService.getAllUrls();
    res.json(new ApiResponse(200, "Successfully Listed all the URLs", data));
}

export const analyticsHandler = async (req: Request, res: Response) => {
    const { code } = req.params;
    console.log("analytics", code);
    const data = await urlShortnerService.getUrlAnalytics(code);
    console.log(data);
    res.json(new ApiResponse(200, "Successfully fetch URLs click analytics data", data));
}

export const redirectHandler = async (req: Request, res: Response) => {
    const { code } = req.params;
    const data = await urlShortnerService.getOriginalURL(code);
    if(data){
        res.redirect(302, data);
    }
    res.status(404).json(new ApiError(404, "Short URL not found"));
}