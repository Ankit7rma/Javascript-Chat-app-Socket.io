const express = require("express");

const app = express();
const http = require("http");
const { isObject } = require("util");
const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
