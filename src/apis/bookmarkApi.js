import axiosInstance from "./axiosInstance";

export const toggleBookmark = async (postId) => {
  const response = await axiosInstance.post(`/bookmarks/${postId}`);
  return response.data;
};

export const getBookmarks = async () => {
  const response = await axiosInstance.get("/bookmarks");
  return response.data;
};