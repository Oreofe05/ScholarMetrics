// import { createContext, useContext, useState } from "react";

// const StudyContext = createContext();

// export function StudyProvider({ children }) {
//   const [uploadedCourses, setUploadedCourses] =
//     useState([]);

//   const [analyses, setAnalyses] =
//     useState([]);

//   const [studyPlans, setStudyPlans] =
//     useState([]);

//   return (
//     <StudyContext.Provider
//       value={{
//         uploadedCourses,
//         setUploadedCourses,
//         analyses,
//         setAnalyses,
//         studyPlans,
//         setStudyPlans,
//       }}
//     >
//       {children}
//     </StudyContext.Provider>
//   );
// }

// export function useStudy() {
//   return useContext(StudyContext);
// }