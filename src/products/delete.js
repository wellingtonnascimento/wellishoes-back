const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});
exports.handler = async (event, context) => {
  const id = event.id;
  return client
    .query(q.Delete(q.Ref(q.Collection("products"), id)))
    .then((response) => {
      return {
        statusCode: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
      };
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
      };
    });
};
