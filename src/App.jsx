import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SidebarRtlMenu from "./components/sidebarRtlMenu/SidebarRtlMenu";
import AdminLayout from "./layouts/adminLayout/AdminLayout";
import CateguryPage from "./pages/categuryPage/CateguryPage";
import LoginPage from "./pages/loginPage/LoginPage";
import { AuthProvider } from "./contexts/authContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<CateguryPage />} />
          </Route>
          <Route path="/loginAdminPanel" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
