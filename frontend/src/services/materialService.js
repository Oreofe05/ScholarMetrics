import API from "../api/axios";

// Upload one or more materials
export const uploadMaterial = async (formData) => {
  const response = await API.post("/materials/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get all materials for a course
export const getCourseMaterials = async (courseId) => {
  const response = await API.get(`/materials/course/${courseId}`);
  return response.data;
};

// Delete a material
export const deleteMaterial = async (materialId) => {
  const response = await API.delete(`/materials/${materialId}`);
  return response.data;
};