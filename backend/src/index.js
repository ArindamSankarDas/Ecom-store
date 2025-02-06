import express from "express";
import rootRoute from "./routes/root.js";
import requestLogger from "./middlewares/logger.js";

// initialise the express application
const app = express();

// creates log for any know requests routes
app.use(requestLogger);
// parses any incoming json request body
app.use(express.json());

// application routes
app.use("/", rootRoute);

// handles 404 routes
app.all("/*", function (_req, res) {
  res.status(404).send("NOT FOUND");
});

// server starts listening on this port
app.listen(process.env.PORT, function (err) {
  if (err) {
    console.error(
      `An Error code of ${err.name} with the message ${err.message}`
    );
  }

  console.log("Server is running on " + "http://localhost:" + process.env.PORT);
});
