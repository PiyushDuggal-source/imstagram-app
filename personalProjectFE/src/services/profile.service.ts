import axios from "axios";
import { CHECK_FOLLOW, Local, LOCALHOST } from "../ENV/env";

export const checkFollow = (userName: string) => {
  return axios.get(
    Local
      ? `${LOCALHOST}/checkFollow/${userName}`
      : `${CHECK_FOLLOW}/${userName}`
  );
};
