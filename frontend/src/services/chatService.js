import API from "../api/axios";

export const askQuestion = async (data) => {
  const response = await API.post("/chat/ask", data);
  return response.data;
};