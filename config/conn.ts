import mongoose from "mongoose";
import config from "config";

const db_uri = config.get<string>("dbUri");

export default async function conn() {
  try {
    await mongoose.connect(db_uri);
    console.log("api conectado ao banco");
  } catch (err) {
    console.log(err);
  }
}
