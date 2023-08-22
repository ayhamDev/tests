const express = require("express");

require("cors")();

const app = express();
app.use(require("express-status-monitor")());
app.get("/", (req, res) => {
  res.json({ msg: process.env.NODE_ENV, msg: "hello", type: "fis21joifiewf" });
  console.log(req);
});
app.get("/admin", (req, res) => {});
app.listen(4000, () => {
  console.log("Server Running on >>> http://localhost:4000");
});
