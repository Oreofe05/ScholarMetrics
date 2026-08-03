import API from "../api/axios";

export const getAssignments = async () => {
  const { data } = await API.get("/assignments");
  return data;
};

export const createAssignment = async (assignment) => {
  const { data } = await API.post("/assignments", assignment);
  return data;
};

export const updateAssignment = async (id, assignment) => {
  const { data } = await API.put(
    `/assignments/${id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (id) => {
  const { data } = await API.delete(
    `/assignments/${id}`
  );
  return data;
};