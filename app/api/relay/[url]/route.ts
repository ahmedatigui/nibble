export async function POST(
  request: Request,
  { params }: { params: { url: string } },
) {
  const url = decodeURIComponent(params.url);
  const headers = new Headers(request.headers);
  const { searchParams } = new URL(request.url);
  const httpMethod = headers.get("x-http-method")!;
  const contentType = headers.get("content-type");

  if (!url) {
    return new Response("URL parameter is required", { status: 400 });
  }

  const headersToDelete = [
    "host",
    "content-length",
    "transfer-encoding",
    "connection",
    "expect",
  ];
  headersToDelete.forEach((header) => {
    headers.delete(header);
  });

  let body;
  if (["POST", "PUT", "PATCH"].includes(httpMethod)) {
    if (contentType === "application/json") {
      const jsonBody = await request.json();
      body = JSON.stringify(jsonBody);
    } else if (contentType === "text/html") {
      body = await request.text();
    } else if (
      contentType === "application/x-yaml" ||
      contentType === "text/yaml"
    ) {
      const text = await request.text();
      body = text;
    } else if (
      contentType === "application/xml" ||
      contentType === "text/xml"
    ) {
      const xmlText = await request.text();
      body = xmlText;
    } else if (contentType === "text/plain") {
      body = await request.text();
    } else {
      return new Response("Unsupported content type", { status: 415 });
    }
  }

  //console.log("URL: ", url);
  //console.log("Headers: ", headers);
  //console.log("Params: ", searchParams);
  //console.log("FData: ", body);
  //console.log("GET REQ: ", request);

  let relayedResponse;
  let responseData = null;

  switch (httpMethod) {
    case "GET":
      relayedResponse = await fetch(`${url}?${searchParams}`, {
        method: "GET",
        headers,
      });
      /*console.log(
        "Headers to Object: ",
        Object.fromEntries(relayedResponse.headers.entries()),
      );*/
      const contentType = relayedResponse.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        responseData = await relayedResponse.json();
      } else {
        responseData = await relayedResponse.text();
      }

      return new Response(
        JSON.stringify({
          body: responseData,
          headers: Object.fromEntries(relayedResponse.headers.entries()),
        }),
      );
      break;

    case "HEAD":
      relayedResponse = await fetch(`${url}?${searchParams}`, {
        method: "HEAD",
        headers,
      });

      responseData = null;

      return new Response(
        JSON.stringify({
          body: responseData,
          headers: Object.fromEntries(relayedResponse.headers.entries()),
        }),
      );
      break;

    case "POST":
    case "PUT":
    case "PATCH":
      relayedResponse = await fetch(`${url}?${searchParams}`, {
        method: httpMethod,
        headers,
        body,
      });

      const postContentType = relayedResponse.headers.get("content-type") || "";
      if (postContentType.includes("application/json")) {
        responseData = await relayedResponse.json();
      } else {
        responseData = await relayedResponse.text();
      }
      return new Response(
        JSON.stringify({
          body: responseData,
          headers: Object.fromEntries(relayedResponse.headers.entries()),
        }),
      );
      break;

    case "DELETE":
      relayedResponse = await fetch(`${url}?${searchParams}`, {
        method: "DELETE",
        headers,
      });
      responseData = null;

      return new Response(
        JSON.stringify({
          body: responseData,
          headers: Object.fromEntries(relayedResponse.headers.entries()),
        }),
      );
      break;

    case "OPTIONS":
      relayedResponse = await fetch(`${url}?${searchParams}`, {
        method: "OPTIONS",
        headers,
      });
      responseData = null;

      return new Response(
        JSON.stringify({
          body: responseData,
          headers: Object.fromEntries(relayedResponse.headers.entries()),
        }),
      );
      break;

    default:
      return new Response("Unsupported method", { status: 405 });
  }
}
