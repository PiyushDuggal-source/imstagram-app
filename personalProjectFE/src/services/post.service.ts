import axios from "axios";
import { IS_FOLLOWED, Local, LOCALHOST } from "../ENV/env";

export const isFollow = async (userName: string) => {
  return await axios.get(
    Local ? `${LOCALHOST}/isFollowed/${userName}` : `${IS_FOLLOWED}isFollowed`
  );
};
