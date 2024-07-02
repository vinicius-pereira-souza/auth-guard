import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";
import User from "../models/User";

const secret = config.get<string>("jwtSecret");

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = (authHeader && authHeader?.split(" ")[1]) || "";

  if (!token) {
    return res.status(401).json({ errors: ["Acesso negado"] });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = await User.findById(decoded.id).select("-password");
    return next();
  } catch (err) {
    console.log(err);

    return res.status(500).json({ errors: ["Falha ao autenticar o token."] });
  }
};

export default verifyToken;
