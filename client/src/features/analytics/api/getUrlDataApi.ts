import { constants } from "../../../constants";
import type { ClickData } from "../interface";
import type { ApiResponse } from "../../../interface";

async function getUrlData(code: string): Promise<ApiResponse<ClickData[]>> {
  const response = await fetch(`${constants.API_BASE_URL}/analytics/${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export default getUrlData;
