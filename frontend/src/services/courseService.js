import API from "../api/axios";

// GET all courses
export const getCourses = async () => {
  const response = await API.get("/courses");
  return response.data;
};

// CREATE course
export const createCourse = async (courseData) => {
  const response = await API.post("/courses", courseData);
  return response.data;
};

// UPDATE course
export const updateCourse = async (courseId, courseData) => {
  const response = await API.put(`/courses/${courseId}`, courseData);
  return response.data;
};

// DELETE course
export const deleteCourse = async (courseId) => {
  const response = await API.delete(`/courses/${courseId}`);
  return response.data;
};