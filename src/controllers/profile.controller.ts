import { Request, Response } from "express";
import { checkFollow } from "../services/post.service";

export const checkIfFollow = async (req: Request, res: Response) => {
  const follower = req.session.userName;
  const userName = req.params.userName;
  const followed = await checkFollow(userName, follower);
  res.json({ followed });
};
