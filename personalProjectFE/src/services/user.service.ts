import axios from "axios";
type PostData = {
  userName: string;
  title: string;
  body: string;
};
export const createPost = async (postData: PostData) => {
  return axios.post("http://localhost:4000/api/create", postData);
};

export const getAllPosts = async () => {
  return axios.get("http://localhost:4000/api/getPosts");
};

export const isLiked = async (postId: string) => {
  return axios.get(`http://localhost:4000/api/isLiked/${postId}`);
};

export const isUser = async (userName: string) => {
  return axios.get(`http://localhost:4000/api/isUser/${userName}`);
};

export const getUserData = async (userName: string) => {
  return axios.get(`http://localhost:4000/api/UserInfo/${userName}`);
};
