const multer = require("multer");
const { storage } = require("../../configs/multerConfig");

const upload = multer({ storage: storage });

const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  //const dataI = upload.single("image");

  console.log("Function `create` invoked", data);
  const item = {
    data: data,
    image: image,
  };
  upload.single("data[image]");

  return client
    .query(q.Create(q.Ref("classes/products"), item))
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
