// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";

// import App from "./App.jsx";

// import { AppProvider } from "./context/AppContext";
// import { StudyProvider } from "./context/StudyContext";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AppProvider>
//       <StudyProvider>
//         <App />
//       </StudyProvider>
//     </AppProvider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);