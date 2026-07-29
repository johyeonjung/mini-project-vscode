import axiosInstance from "./axiosInstance";

export const getFeeds = async (currentPage = 1, size = 10) => {
  const response = await axiosInstance.get("/posts", {
    params: {
      currentPage,
      size,
    },
  });

  return response.data;
};

export const getPost = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

export const getUserPosts = async (instagramId) => {
  const response = await axiosInstance.get(
    `/posts/users/${instagramId}`
  );

  return response.data;
};

export const createPost = async (formData) => {
  const response = await axiosInstance.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updatePost = async (postId, data) => {
  const response = await axiosInstance.put(
    `/posts/${postId}`,
    data
  );

  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};