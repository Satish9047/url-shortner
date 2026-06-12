import { Request, Response } from "express";
import {asyncHandler} from "../utils/asyncHandler.utils";
import { ApiResponse } from "../utils/apiResponse.utils";

export const shortUrlHandler = (req: Request, res: Response) => {
    const { url } = req.body;
    const data = await recipeService.addPizzaBaseService(url);
    res.json(new ApiResponse(200, "Pizza base added successfully", data));
}

// export const shortUrlHandler = asyncHandler(async (req: Request, res: Response) => {
//     const { url } = req.body;
//     const data = await recipeService.addPizzaBaseService(req.body);
//     res.json(new ApiResponse(200, "Pizza base added successfully", data));
// });