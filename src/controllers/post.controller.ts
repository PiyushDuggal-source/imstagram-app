import { Request, Response } from "express";
import { checkFollow, follow } from "../services/post.service";

export const isFollow = async (req: Request, res: Response) => {
  console.log(`Route is reached with ${req.path} and method ${req.method}`);
  const currentUserName = req.session.userName;
  const followUserName = req.params.userName;
  const followed = await checkFollow(followUserName, currentUserName);

  if (!followed) {
    follow(followUserName, currentUserName);
  }
  res.json({ followed });
};
