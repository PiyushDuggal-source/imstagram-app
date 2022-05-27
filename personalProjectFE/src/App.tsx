import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/404/NotFound";
import Create from "./components/Create/Create";
import Home from "./components/Home/Home";
import Logout from "./components/Logout/Logout";
import Navbar from "./components/NavBar/Navbar";
import NotImple from "./components/NotImplemplemented/NotImple";
import Profile from "./components/Profile/Profile";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/Signup";
import { loggedInInfo } from "./services/auth.services";

export const LoginInfo = createContext<(boolean | string)[]>([]);

function App() {
  const [login, setLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    const getLoginInfo = async () => {
      const isLoggedIn = await loggedInInfo();
      setLogin(isLoggedIn.data.auth);
      setUserName(isLoggedIn.data.userName);
    };
    getLoginInfo();
  }, []);
  return (
    <>
      <LoginInfo.Provider value={[login, userName]}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user/:userName" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/create" element={<Create />} />
          <Route path="/inbox" element={<NotImple />} />
          <Route path="/edit" element={<NotImple />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </LoginInfo.Provider>
    </>
  );
}

export default App;
