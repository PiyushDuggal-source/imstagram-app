import axios from "axios";
import {
  CREATE_POST,
  GET_ALL_POSTS,
  GET_USER_DATA,
  IS_LIKED,
  IS_USER,
  Local,
} from "../ENV/env";
type PostData = {
  userName: string;
  title: string;
  body: string;
};
export const createPost = async (postData: PostData) => {
  return axios.post(
    Local ? "http://localhost:4000/api/create" : CREATE_POST,
    postData
  );
};

export const getAllPosts = async () => {
  return axios.get(
    Local ? "http://localhost:4000/api/getPosts" : GET_ALL_POSTS
  );
};

export const isLiked = async (postId: string) => {
  return axios.get(
    Local
      ? `http://localhost:4000/api/isLiked/${postId}`
      : `${IS_LIKED}${postId}`
  );
};

export const isUser = async (userName: string) => {
  return axios.get(
    Local
      ? `http://localhost:4000/api/isUser/${userName}`
      : `${IS_USER}${userName}`
  );
};

export const getUserData = async (userName: string) => {
  return axios.get(
    Local
      ? `http://localhost:4000/api/UserInfo/${userName}`
      : `${GET_USER_DATA}${userName}`
  );
};
