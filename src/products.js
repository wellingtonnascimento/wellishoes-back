exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^\/]+/, "");
  const segments = path.split("/").filter((e) => e);

  switch (event.httpMethod) {
    case "GET":
      if (segments.length === 0) {
        return require("./products/read-all")(event, context);
      }
      if (segments.length === 1) {
        event.id = segments[0];
        return require("./products/read").handler(event, context);
      } else {
        return {
          statusCode: 500,
        };
      }
    case "POST":
      return require("./products/create").handler(event, context);
    case "PUT":
      if (segments.length === 1) {
        event.id = segments[0];
        console.log(event.id);
        return require("./products/update").handler(event, context);
      } else {
        return {
          statusCode: 500,
        };
      }
    case "DELETE":
      if (segments.length === 1) {
        event.id = segments[0];
        return require("./products/delete").handler(event, context);
      } else {
        return {
          statusCode: 500,
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
      };
  }
  return {
    statusCode: 500,
  };
};
