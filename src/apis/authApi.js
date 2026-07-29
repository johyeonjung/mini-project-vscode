import axiosInstance from "./axiosInstance";

export const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};