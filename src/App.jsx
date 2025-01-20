//App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import StockManagement from "./pages/stocks/StockManagement";
import StockPage from "./components/stock/StockPage";
import SectionPage from "./components/section/SectionPage";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import Register from "./pages/register/Register";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/app_estoque" />} />
        {/* Redireciona */}
        <Route path="/app_estoque" element={<StockManagement />} />
        <Route path="/app_estoque/stock/:id" element={<StockPage />} />
        <Route
          path="/app_estoque/stock/:stockId/sections/:sectionId"
          element={<SectionPage />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
