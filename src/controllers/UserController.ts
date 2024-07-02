import User from "../models/User";
import { Request, Response } from "express";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import createUserToken from "../utils/createUserToken";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      errors: ["Este E-mail já existe, por favor utilize outro E-mail!"],
    });
  }

  // Generate password hash
  const salt = genSaltSync(10);
  const passwordHash = hashSync(password, salt);

  // Create user
  const newUser = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await newUser.save();
    const token = createUserToken(newUser._id);

    return res.status(201).json({
      id: newUser._id,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  // check if password match
  const checkPassword = compareSync(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ errors: ["Senha inválida!"] });
  }

  try {
    const token = createUserToken(user._id);

    return res.status(200).json({
      id: user._id,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  const id = req.user._id;

  const user = await User.findById(id).select("-password").exec();

  if (!user) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  try {
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  try {
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

interface UpdateUser {
  name: string;
  email: string;
  profileimage?: string;
}

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const id = req.user._id;

  let updatedUser = <UpdateUser>{};

  if (req.file) {
    updatedUser.profileimage = req.file.filename;
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  updatedUser!.name = name;

  if (email !== user.email) {
    return res.status(403).json({
      errors: [
        "O E-mail não pode ser alterado, por favor digite o mesmo E-mail.",
      ],
    });
  }

  updatedUser!.email = email;

  try {
    const neUser = await User.findByIdAndUpdate(user._id, updatedUser, {
      new: true,
    }).select("-password");

    return res.status(200).json(neUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

export { register, login, getCurrentUser, getUserById, updateUser };
