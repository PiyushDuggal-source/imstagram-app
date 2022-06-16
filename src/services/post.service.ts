import { UserModel } from "../models/user.model";

/*
returns 
*/
/**
 *
 * @param followUserName
 * @param currentUserName
 * @returns true if `currentUserName` is a follower of `followUserName`
 */
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
