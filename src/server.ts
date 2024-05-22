import app from "./app";

import mongoose from "mongoose";
import config from "./config";
import { Response } from "express";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.get("/", (req, res: Response) => {
      res.send({ message: "Welcome to Assignment-2" });
    });

    app.listen(config.port, () => {
      console.log(` app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
