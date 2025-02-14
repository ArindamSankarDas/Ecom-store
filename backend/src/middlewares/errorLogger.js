import { join, resolve } from "node:path";
import { stat, mkdir, appendFile } from "node:fs/promises";
import { logGenerator } from "../utils/logGenerator.js";
import { randomUUID } from "node:crypto";

async function errorLogger(err, req, res) {
  try {
    const logsDir = resolve(import.meta.dirname, "..", "logs");

    await stat(logsDir).catch(async (statErr) => {
      if (statErr.code === "ENOENT") {
        await mkdir(logsDir).catch(function (dirErr) {
          console.error("Error creating directory:", dirErr);
          res.status(500).send("Internal Server Error");
        });
      }

      console.error("Error checking logs directory:", statErr);
      res.status(500).send("Internal Server Error");
    });

    const logInfo = logGenerator(randomUUID(), req.method, req.path, err);

    await appendFile(join(logsDir, "errors.log"), logInfo, {
      encoding: "utf-8",
    }).catch(function (fileCreate_AppendErr) {
      console.error("Error checking logs directory:", fileCreate_AppendErr);
      res.status(500).send("Internal Server Error");
    });

    res.status(500).json({ message: "Something went wrong" });
  } catch (error) {
    console.error(err);

    res.status(500).send("Internal Server Error");
  }
}

export default errorLogger;
