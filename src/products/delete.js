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
      };
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
