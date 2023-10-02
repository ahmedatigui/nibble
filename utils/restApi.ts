import axios from "axios";

// Handle
export default async function createApiRequestFunction({
  apiURL,
  httpMethod = "GET",
  body,
}: {
  apiURL: string;
  httpMethod: string;
  body?: string | undefined;
}) {
  switch (httpMethod) {
    case "GET":
      return await getApi({ apiURL, httpMethod });
      break;
    case "POST":
      return await postApi({ apiURL, httpMethod, body });
      break;

    default:
      break;
  }
}

// GET
async function getApi({
  apiURL,
  httpMethod,
}: {
  apiURL: string;
  httpMethod: string;
}) {
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
  body,
}: {
  apiURL: string;
  httpMethod: string;
  body: string | undefined;
}) {
  try {
    const response = await axios.post(apiURL, body);
    return response;
  } catch (error) {
    return error;
  }
}

export { getApi, postApi };
