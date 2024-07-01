import jwt, { Secret } from "jsonwebtoken";
import config from "config";
import { Types } from "mongoose";

const secret: Secret = config.get<string>("jwtSecret");

const createUserToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id }, secret, { expiresIn: "1d" });

  return token;
};

export default createUserToken;
