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
    case "DELETE":
      return await deleteApi({ apiURL, httpMethod, data, headers, params });
      break;
    case "HEAD":
      return await headApi({ apiURL, httpMethod, data, headers, params });
      break;
    case "OPTIONS":
      return await optionsApi({ apiURL, httpMethod, data, headers, params });
      break;
    case "PATCH":
      return await patchApi({ apiURL, httpMethod, data, headers, params });
      break;
    case "PUT":
      return await putApi({ apiURL, httpMethod, data, headers, params });
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

// DELETE
async function deleteApi({
  apiURL,
  httpMethod,
  headers,
  params,
}: httpRequestConfigType) {
  try {
    const response = await axios.delete(apiURL, {
      url: apiURL,
      headers: headers,
      params: params,
    });
    return response;
  } catch (error) {
    return error;
  }
}

// HEAD
async function headApi({
  apiURL,
  httpMethod,
  headers,
  params,
}: httpRequestConfigType) {
  try {
    const response = await axios.head(apiURL, {
      url: apiURL,
      headers: headers,
      params: params,
    });
    return response;
  } catch (error) {
    return error;
  }
}

// OPTIONS
async function optionsApi({
  apiURL,
  httpMethod,
  headers,
  params,
}: httpRequestConfigType) {
  try {
    const response = await axios.options(apiURL, {
      url: apiURL,
      headers: headers,
      params: params,
    });
    return response;
  } catch (error) {
    return error;
  }
}

// PATCH
async function patchApi({
  apiURL,
  httpMethod,
  data,
  config,
  headers,
  params,
}: httpRequestConfigType) {
  try {
    const response = await axios.patch(apiURL, data, {
      url: apiURL,
      headers: headers,
      params: params,
    });
    return response;
  } catch (error) {
    return error;
  }
}

// PUT
async function putApi({
  apiURL,
  httpMethod,
  data,
  config,
  headers,
  params,
}: httpRequestConfigType) {
  try {
    const response = await axios.put(apiURL, data, {
      url: apiURL,
      headers: headers,
      params: params,
    });
    return response;
  } catch (error) {
    return error;
  }
}

export { getApi, postApi, deleteApi, headApi, optionsApi, patchApi, putApi };
