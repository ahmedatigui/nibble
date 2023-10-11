import createApiRequestFunction from "@/utils/restApi";
import { httpRequestConfigType } from "@/utils/types";

export async function useRestApi({
  apiURL,
  httpMethod = "GET",
  data,
  config
}: httpRequestConfigType) {

  await createApiRequestFunction({ apiURL, httpMethod, data, config });
}
