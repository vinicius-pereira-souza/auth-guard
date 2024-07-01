import { body } from "express-validator";

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatorio!")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatorio!")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatorio!")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres."),
    body("confirmpassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatoria!")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senha precisam ser iguais!");
        }

        return true;
      }),
  ];
};

const userLoginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("e-mail é obrigatorio!")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("password").isString().withMessage("A senha é obrigatorio!"),
  ];
};

const userUpdateValidation = () => {

  return [
      body("name")
      .isString()
      .withMessage("O nome é obrigatorio!")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
      body("email")
      .isString()
      .withMessage("O e-mail é obrigatorio!")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
  ]

}

export { userCreateValidation, userLoginValidation, userUpdateValidation };
