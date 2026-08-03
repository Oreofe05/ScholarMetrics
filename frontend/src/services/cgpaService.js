import API from "../api/axios";


export const getCourses = async () => {
  const { data } = await API.get("/cgpa");
  return data;
};

export const createCourse = async (course) => {
  const { data } = await API.post("/cgpa", course);
  return data;
};

export const updateCourse = async (id, course) => {
  const { data } = await API.put(`/cgpa/${id}`, course);
  return data;
};

export const deleteCourse = async (id) => {
  const { data } = await API.delete(`/cgpa/${id}`);
  return data;
};