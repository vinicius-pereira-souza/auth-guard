import "dotenv/config";

const port = process.env.PORT;
const dbUri = process.env.DB_URI;
const jwt_secret = process.env.JWT_SECRET;

export default {
  port: port,
  dbUri: dbUri,
  jwtSecret: jwt_secret,
};
