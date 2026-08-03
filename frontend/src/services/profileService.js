import API from "../api/axios";

export const updateProfile = async (formData) => {
  const response = await API.put("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/profile");
  return response.data;
};