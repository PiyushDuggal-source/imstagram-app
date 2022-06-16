import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
    return;
  } else {
    res.send({ auth: false });
  }
};
