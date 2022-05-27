import axios from "axios";
import { CREATE_NEW_USER, Local, LOGIN, LOGIN_INFO, LOGOUT } from "../ENV/env";
import { LoginInterface } from "../ValidateSchema&InitialValues/initialValues";
axios.defaults.withCredentials = true;

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: "Male" | "Female" | "Others";
}

export const createNewUser = (body: User) => {
  return axios.post(
    Local ? "http://localhost:4000/api/signup" : CREATE_NEW_USER,
    body
  );
};

interface LoginData {
  data: {
    userName: string;
    auth: boolean;
  };
}

export const loggedInInfo = async (): Promise<LoginData> => {
  return await axios.get(Local ? "http://localhost:4000/api/me" : LOGIN_INFO, {
    withCredentials: true,
  });
};

export const login = (data: LoginInterface) => {
  return axios.post(Local ? "http://localhost:4000/api/login" : LOGIN, data);
};

export const logoutMe = () => {
  return axios.get(Local ? "http://localhost:4000/api/logout" : LOGOUT);
};
