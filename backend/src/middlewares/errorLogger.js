import { join, resolve } from "node:path";
import { stat, mkdir, appendFile } from "node:fs/promises";
import { logGenerator } from "../utils/logGenerator.js";
import { randomUUID } from "node:crypto";

async function errorLogger(err, req, res, _next) {
  try {
    const logsDir = resolve(import.meta.dirname, "..", "logs");

    await stat(logsDir).catch(async (statErr) => {
      if (statErr.code === "ENOENT") {
        await mkdir(logsDir).catch(function (dirErr) {
          console.error("Error creating directory:", dirErr);
          res.sendStatus(500);
        });
      }

      console.error("Error checking logs directory:", statErr);
      res.sendStatus(500);
    });

    const logInfo = logGenerator(randomUUID(), req.method, req.path, err);

    await appendFile(join(logsDir, "errors.log"), logInfo, {
      encoding: "utf-8",
    }).catch(function (fileCreate_AppendErr) {
      console.error("Error checking logs directory:", fileCreate_AppendErr);
      res.sendStatus(500);
    });

    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  } catch (error) {
    console.error(err);

    res.sendStatus(500);
  }
}

export default errorLogger;
