import axios from "axios";
import { httpRequestConfigType } from "./types";

// Handle
export default async function createApiRequestFunction({
  apiURL,
  httpMethod = "GET",
  data,
}: httpRequestConfigType) {
  switch (httpMethod) {
    case "GET":
      return await getApi({ apiURL, httpMethod });
      break;
    case "POST":
      return await postApi({ apiURL, httpMethod, data });
      break;
    default:
      break;
  }
}

// GET
async function getApi({
  apiURL,
  httpMethod,
}: httpRequestConfigType) {
  try {
    const response = await axios.get(apiURL);
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
  config
}: httpRequestConfigType) {
  try {
    const response = await axios.post(apiURL, data, config);
    return response;
  } catch (error) {
    return error;
  }
}

export { getApi, postApi };
