const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  return client
    .query(q.Create(q.Ref("classes/products"), { data }))
    .then((response) => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
