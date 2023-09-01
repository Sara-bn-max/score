import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SidebarRtlMenu from "./components/sidebarRtlMenu/SidebarRtlMenu";
import AdminLayout from "./layouts/adminLayout/AdminLayout";
import CateguryPage from "./pages/categuryPage/CateguryPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<CateguryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
