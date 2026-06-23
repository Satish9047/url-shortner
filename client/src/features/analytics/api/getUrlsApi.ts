import { constants } from "../../../constants";
import type { UrlResponse } from "../interface";
import type { ApiResponse } from "../../../interface";

async function getUrls(page = 1): Promise<ApiResponse<UrlResponse>> {
  const response = await fetch(
    `${constants.API_BASE_URL}/urls?page=${page}&limit=${constants.NUMBER_OF_LINKS_PER_PAGE}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return await response.json();
}

export default getUrls;
