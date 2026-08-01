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

  const value = {
    uploadedCourses,
    setUploadedCourses,

    assignments,
    setAssignments,

    cgpa,
    setCgpa,
  };

  return (
    <AppContext.Provider
        value={{
            uploadedCourses,
            setUploadedCourses,

            cgpa,
            setCgpa,

            assignments,
            setAssignments,
        }}
        >
        {children}
        </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}