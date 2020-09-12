const faunadb = require("faunadb");

const q = faunadb.query;
const client = faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const id = event.id;
  console.log(`Function 'delete' invoked. delete id:: ${id}`);
  return client
    .query(q.Delete(q.Ref(`classes/products/${id}`)))
    .then((response) => {
      console.log("success", response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
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