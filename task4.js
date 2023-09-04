const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 2410;
const requests = [];

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log(`Node app listening on port ${port}!`);
});

app.post("/request", async function (req, res) {
  const url = req.body.url;
  const method = req.body.method;
  const body = req.body.body;
  const config = req.body.config;

  requests.push(req.body);

  try {
    let response;

    if (method === "GET") {
      response = await axios.get(url, config);
    } else if (method === "POST") {
      response = await axios.post(url, body, config);
    } else if (method === "PUT") {
      response = await axios.put(url, body, config);
    } else if (method === "DELETE") {
      response = await axios.delete(url, config);
    }
    console.log(response.data);
    let data = typeof response.data === 'number' ? response.data.toString() : response.data;
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status).send(error.response.data)
  }
});

app.get("/allRequests", function (req, res) {
  res.json(requests);
});
