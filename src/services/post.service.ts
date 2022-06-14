import { UserModel } from "../models/user.model";

export const checkFollow = async (
  followUserName: string,
  currentUserName: string | undefined
) => {
  const user = await UserModel.findOne({ userName: followUserName });
  if (user?.followers.includes(String(currentUserName))) {
    return true;
  } else {
    return false;
  }
};

export const follow = async (
  followUserName: string,
  currentUserName: string | undefined
) => {
  await UserModel.updateOne(
    { userName: followUserName },
    {
      $push: {
        followers: [`${currentUserName}`],
      },
    }
  );
  await UserModel.updateOne(
    { userName: currentUserName },
    {
      $push: {
        followings: [`${followUserName}`],
      },
    }
  );
};
