import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const createURL = async (urlData) => {
  const res = await axiosInstance.post("/bookmark/create", urlData);
  return res.data;
};

export const getAllURL = async () => {
  const res = await axiosInstance.get("/bookmark/all");
  return res.data;
};

export const removeURL = async (id) => {
  const res = await axiosInstance.delete(`/bookmark/${id}`);
  return res.data;
};
