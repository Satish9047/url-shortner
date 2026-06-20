import { constants } from "../../../constants";
import type {ApiResponse} from "../../../interface"

interface shortenerApiResponse {
    url: string | null
    secondsRemaining: number | null;
}

export async function postOriginalUrl(OriginalUrl: string):Promise<ApiResponse<shortenerApiResponse>> {
    console.log("originalUrl", OriginalUrl)
    const response = await fetch(`${constants.API_BASE_URL}/short-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({url: OriginalUrl}),
    });
    return await response.json();
}
