import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext();

export function AppProvider({ children }) {

  const [uploadedCourses, setUploadedCourses] =
    useLocalStorage("uploadedCourses", []);

  const [assignments, setAssignments] =
    useLocalStorage("assignments", []);

  const [cgpa, setCgpa] =
    useLocalStorage("cgpa", 0);

  // Student Profile
  const [studentProfile, setStudentProfile] =
  useLocalStorage("studentProfile", {
    photo: "",
    fullName: "",
    university: "",
    department: "",
    level: "",
    cgpaScale: 5,
  });

  return (
    <AppContext.Provider
      value={{
        uploadedCourses,
        setUploadedCourses,

        assignments,
        setAssignments,

        cgpa,
        setCgpa,

        studentProfile,
        setStudentProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}