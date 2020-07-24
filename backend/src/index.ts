import * as Express from "express";
import * as bodyParser from "body-parser";
import * as Morgan from "morgan";

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Morgan("dev"));

const port = 3000;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
