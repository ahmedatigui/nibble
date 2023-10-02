// import { useMutation, useQuery } from '@tanstack/react-query';
import createApiRequestFunction from "@/utils/restApi";

export async function useRestApi({
  apiURL,
  httpMethod = "GET",
  body,
}: {
  apiURL: string;
  httpMethod: string;
  body?: string | undefined;
}) {
  // const isQueryEnabled = Boolean(httpMethod === 'GET');
  // const isMutationEnabled = Boolean(httpMethod !== 'GET');

  await createApiRequestFunction({ apiURL, httpMethod, body });

  // return useQuery<any>({
  //   queryKey: [httpMethod, apiURL],
  //   queryFn: () => getApi({ apiURL, httpMethod}),
  //   enabled: isQueryEnabled,
  //   suspense: false,
  //   staleTime: 60 * 1000,
  // });

  // return useMutation<any>({
  //   mutationFn: () => getApi({ apiURL, httpMethod}),
  //   mutationKey: [httpMethod, apiURL],
  //   enabled: isMutationEnabled,
  //   // suspense: false,
  //   // staleTime: 60 * 1000,
  // });

  //   return {
  //     data: undefined,
  //     isLoading: false,
  //     isError: true,
  //     error: new Error('Method is missing'),
  //   };
}
