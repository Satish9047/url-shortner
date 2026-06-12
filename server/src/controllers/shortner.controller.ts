import { Request, Response } from "express";
// import {asyncHandler} from "../utils/asyncHandler.utils";
import { ApiResponse } from "../utils/apiResponse.utils";
import * as urlShortnerService from "../services/shortner.service";

export const shortUrlHandler = async (req: Request, res: Response) => {
    const { url }: { url: string } = req.body;
    const data = await urlShortnerService.shortenUrl(url);
    res.json(new ApiResponse(200, "URL shortened successfully", data));
}

// export const shortUrlHandler = asyncHandler(async (req: Request, res: Response) => {
//     const { url } = req.body;
//     const data = await recipeService.addPizzaBaseService(req.body);
//     res.json(new ApiResponse(200, "Pizza base added successfully", data));
// });