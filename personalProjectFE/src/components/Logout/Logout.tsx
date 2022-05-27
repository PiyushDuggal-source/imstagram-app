import { useEffect } from "react";
import { logoutMe } from "../../services/auth.services";

const Logout = () => {
  useEffect(() => {
    logoutMe();
    window.location.href = "/";
  }, []);
  return <></>;
};

export default Logout;
