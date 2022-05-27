import axios from "axios";
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
  return axios.post("http://localhost:4000/api/signup", body);
};

interface LoginData {
  data: {
    userName: string;
    auth: boolean;
  };
}

export const loggedInInfo = async (): Promise<LoginData> => {
  return await axios.get("http://localhost:4000/api/me", {
    withCredentials: true,
  });
};

export const login = (data: LoginInterface) => {
  return axios.post("http://localhost:4000/api/login", data);
};

export const logoutMe = () => {
  return axios.get("http://localhost:4000/api/logout");
};
