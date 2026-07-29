import axiosInstance from "./axiosInstance";

export const getStories = async () => {
  const response = await axiosInstance.get("/stories");
  return response.data;
};

export const getMyStories = async () => {
  const response = await axiosInstance.get("/stories/me");
  return response.data;
};

export const createStory = async (images) => {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await axiosInstance.post("/stories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteStory = async (storyId) => {
  const response = await axiosInstance.delete(`/stories/${storyId}`);
  return response.data;
};