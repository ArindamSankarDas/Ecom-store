import express from "express";

const app = express();

app.get("/", function (req, res) {
  console.log("Let's get started with the backend 🚀🚀");
});

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.log(`An Error code of ${err.name} with the message ${err.message}`);
  }
});
