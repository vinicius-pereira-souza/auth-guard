import express from "express";
import config from "config";

import router from "./routes";
import conn from "../config/conn";
// model
import User from "./models/User";

const port = config.get<number>("port");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, async () => {
  await conn();
  console.log("A aplicação esta rodando!");
});
