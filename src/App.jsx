//App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import StockManagement from "./pages/home/StockManagement";
import StockPage from "./components/stock/StockPage";
import SectionPage from "./components/section/SectionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app_estoque" />} />
      {/* Redireciona */}
      <Route path="/app_estoque" element={<StockManagement />} />
      <Route path="/app_estoque/stock/:id" element={<StockPage />} />
      <Route
        path="/app_estoque/stock/:stockId/sections/:sectionId"
        element={<SectionPage />}
      />
    </Routes>
  );
};

export default App;
