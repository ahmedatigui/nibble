import axios from "axios";
import { httpRequestConfigType } from "./types";

const relay_route = "/api/relay";

// Handle
export default async function createApiRequestFunction({
  apiURL,
  httpMethod = "GET",
  data = "",
  headers,
  params,
}: httpRequestConfigType) {
  apiURL = `${relay_route}/${encodeURIComponent(apiURL)}`;

  return await postApi({ apiURL, httpMethod, data, headers, params });
}

// POST
async function postApi({
  apiURL,
  httpMethod,
  data,
  config,
  headers,
  params,
}: httpRequestConfigType) {
  try {
    const response = await axios.post(apiURL, data, {
      url: apiURL,
      headers: { ...headers, "x-http-method": httpMethod },
      params: params,
    });
    return response;
  } catch (error) {
    return error;
  }
}
