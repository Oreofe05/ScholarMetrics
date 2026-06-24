import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import DashboardPage from "./pages/DashboardPage";
import CGPAPage from "./pages/CGPAPage";
import AssignmentPage from "./pages/AssignmentPage";
import StudyLabPage from "./pages/StudyLabPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">

        <Sidebar />

        <div className="flex-1 flex flex-col min-h-screen">

          <Navbar />

          <main className="flex-1 overflow-auto p-4 md:p-6">

            <Routes>

              <Route
                path="/"
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

            </Routes>
            <MobileBottomNav />
          </main>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;