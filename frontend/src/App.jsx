import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import CGPAPage from "./pages/CGPAPage";
import AssignmentPage from "./pages/AssignmentPage";
import StudyLabPage from "./pages/StudyLabPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import StudyLab from "./components/studyLab/StudyLab";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/profile-setup"
          element={<ProfileSetupPage />}
        />

        <Route
          path="/study-lab/:courseId"
          element={<StudyLab />}
        />

        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/cgpa"
            element={<CGPAPage />}
          />

          <Route
            path="/assignments"
            element={<AssignmentPage />}
          />

          <Route
            path="/study-lab"
            element={<StudyLabPage />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;