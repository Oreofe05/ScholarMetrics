import API from "../api/axios";

export const getProgress = async (materialId) => {
  const response = await API.get(`/progress/${materialId}`);
  return response.data;
};

export const updateProgress = async (materialId, data) => {
  const response = await API.put(`/progress/${materialId}`, data);
  return response.data;
};