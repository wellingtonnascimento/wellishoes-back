const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

module.exports = async (event, context) => {
  console.log("Function `read-all` invoked");

  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_products"))))
    .then((response) => {
      const itemsRefs = response.data;

      const getAllItemsDataQuery = itemsRefs.map((ref) => {
        return q.Get(ref);
      });

      return client.query(getAllItemsDataQuery).then((ret) => {
        const wellformedData = ret.map((malformedResponse) => {
          return {
            id: malformedResponse.ts,
            ...malformedResponse.data,
          };
        });
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          },
          body: JSON.stringify({ title }),
        };
      });
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
