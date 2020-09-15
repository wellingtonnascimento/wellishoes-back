exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^\/]+/, "");
  const segments = path.split("/").filter((e) => e);

  switch (event.httpMethod) {
    case "GET":
      if (segments.length === 0) {
        return require("./products/read-all").handler(event, context);
      }
      if (segments.length === 1) {
        event.id = segments[0];
        return require("./products/read").handler(event, context);
      } else {
        return {
          statusCode: 500,
          body:
            "too many segments in GET request, must be either /.netlify/functions/products or /.netlify/functions/products/123456",
        };
      }
    case "POST":
      // e.g. POST /.netlify/functions/products with a body of key value pair objects, NOT strings
      return require("./products/create").handler(event, context);
    case "PUT":
      // e.g. PUT /.netlify/functions/products/123456 with a body of key value pair objects, NOT strings
      if (segments.length === 1) {
        event.id = segments[0];
        console.log(event.id);
        return require("./products/update").handler(event, context);
      } else {
        return {
          statusCode: 500,
          body:
            "invalid segments in POST request, must be /.netlify/functions/products/123456",
        };
      }
    case "DELETE":
      if (segments.length === 1) {
        event.id = segments[0];
        return require("./products/delete").handler(event, context);
      } else {
        return {
          statusCode: 500,
          body:
            "invalid segments in DELETE request, must be /.netlify/functions/customers/123456",
        };
      }
    case "OPTIONS":
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      };

      return {
        statusCode: 200,
        headers,
        body: "This was a preflight call!",
      };
  }
  return {
    statusCode: 500,
    body:
      "unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS",
  };
};
