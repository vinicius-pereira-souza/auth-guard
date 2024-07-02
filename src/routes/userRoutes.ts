import { Router } from "express";
import {
  login,
  register,
  getCurrentUser,
  getUserById,
  updateUser,
} from "../controllers/UserController";
import {
  userCreateValidation,
  userLoginValidation,
  userUpdateValidation,
} from "../middlewares/userValidation";
import validation from "../middlewares/handleValidation";
import verifyToken from "../middlewares/verifyToken";
import { imageUpdate } from "../middlewares/updateImage";

export default Router()
  .post("/register", userCreateValidation(), validation, register)
  .post("/login", userLoginValidation(), validation, login)
  .get("/", verifyToken, getCurrentUser)
  .get("/:id", getUserById)
  .patch(
    "/",
    verifyToken,
    imageUpdate.single("profileimage"),
    userUpdateValidation(),
    validation,
    updateUser,
  );
