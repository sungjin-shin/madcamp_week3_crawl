import * as Express from "express";
import * as bodyParser from "body-parser";
import * as Morgan from "morgan";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";

const app = Express();

const { TYPEORM_CONNECTION } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Morgan("dev"));

const initialize = async (): Promise<void> => {
  try {
    await createConnection();
    console.debug(`${TYPEORM_CONNECTION} connection is established`);
  } catch (e) {
    console.error(e);
  }
};

initialize();

export default app;
