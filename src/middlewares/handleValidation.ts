import { Request, Response, NextFunction } from "express";
import { validationResult, Result } from "express-validator";

const validation = (req: Request, res: Response, next: NextFunction) => {
  const erros: Result = validationResult(req);

  if (erros.isEmpty()) {
    return next();
  }

  const extractedErrors: any[] = [];

  erros.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export default validation;
