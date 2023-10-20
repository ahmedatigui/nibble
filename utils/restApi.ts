import axios from "axios";
import { httpRequestConfigType } from "./types";

// Handle
export default async function createApiRequestFunction({
  apiURL,
  httpMethod = "GET",
  data,
  headers,
  params,
}: httpRequestConfigType) {
  switch (httpMethod) {
    case "GET":
      return await getApi({ apiURL, httpMethod, headers, params });
      break;
    case "POST":
      return await postApi({ apiURL, httpMethod, data, headers, params });
      break;
    default:
      break;
  }
}

// GET
async function getApi({
  apiURL,
  httpMethod,
  headers,
  params,
}: httpRequestConfigType) {
  try {
    const response = await axios.get(apiURL, {
      url: apiURL,
      headers: headers,
      params: params,
    });
    return response;
  } catch (error) {
    return error;
  }
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
      headers: headers,
      params: params,
    });
    return response;
  } catch (error) {
    return error;
  }
}

export { getApi, postApi };
