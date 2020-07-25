import * as Express from "express";
import * as bodyParser from "body-parser";
import * as Morgan from "morgan";
import * as cors from "cors";
import * as session from "express-session";
import route from "./routes";
import views from "./views";
import { createConnection } from "typeorm";

const app = Express();

const { TYPEORM_CONNECTION } = process.env;

const initialize = async (): Promise<void> => {
  try {
    await createConnection();
    console.debug(`${TYPEORM_CONNECTION} connection is established`);
  } catch (e) {
    console.error(e);
  }
};

initialize();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use("/static", Express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Morgan("dev"));
app.use(cors());
app.use(
  session({
    secret: "week3_sucks",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", views);
app.use("/api", route);

app.use(function (req, res, next) {
  res.status(404).send("Sorry! 존재하지 않는 API이에오!");
});

export default app;
