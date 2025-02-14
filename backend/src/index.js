import express from "express";
import rootRoute from "./routes/root.js";
import categoryRoute from "./routes/category.js";
import requestLogger from "./middlewares/logger.js";
import cors from "cors";
import corsOptions from "./config/corsConfig.js";
import errorLogger from "./middlewares/errorLogger.js";

// initialise the express application
const app = express();

// handles cross-origin requests from browsers and other server services
app.use(cors(corsOptions));

// creates log for any know requests routes
app.use(requestLogger);

// parses any incoming json request body
app.use(express.json());

// application routes
app.use("/", rootRoute);
app.use("/category", categoryRoute);

// handles 404 routes
app.all("/*", (_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorLogger);

// server starts listening on this port
app.listen(process.env.PORT, function (err) {
  if (err) {
    console.error(
      `An Error code of ${err.name} with the message ${err.message}`
    );
  }

  console.log("Server is running on " + "http://localhost:" + process.env.PORT);
});
