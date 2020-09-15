const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);

  console.log("Function `create` invoked", data);

  return client
    .query(q.Create(q.Ref("classes/products"), { data }))
    .then((response) => {
      console.log("success", response);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify(statusCode),
      };
    })
    .catch((error) => {
      console.log("error", error);

      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
