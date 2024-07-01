import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileimage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const User = model<IUser>("User", UserSchema);

export default User;
