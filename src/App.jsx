import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AppProvider } from "./context/AppContext";

import DashboardLayout from "./components/layout/DashboardLayout";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import CGPAPage from "./pages/CGPAPage";
import AssignmentPage from "./pages/AssignmentPage";
import StudyLabPage from "./pages/StudyLabPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";


function App() {
  return (
    <AppProvider>
      <BrowserRouter>

        <Routes>

          {/* Public Route */}
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          {/* Dashboard Layout */}
          <Route element={<DashboardLayout />}>

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
    </AppProvider>
  );
}

export default App;