import * as dotenv from "dotenv";
import * as path from "path";

const { NODE_ENV } = process.env;

dotenv.config({
  path: path.resolve(
    process.cwd(),
    NODE_ENV === "development" ? ".env.development" : ".env"
  ),
});
