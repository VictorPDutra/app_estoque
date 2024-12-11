//App.jsx

import { Routes, Route } from "react-router-dom";
import StockManagement from "./pages/StockManagement";
import StockPage from "./pages/StockPage";
import SectionPage from "./pages/SectionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/app_estoque/" element={<StockManagement />} />
      <Route path="/app_estoque/stock/:id" element={<StockPage />} />
      <Route
        path="/app_estoque/stock/:stockId/sections/:sectionId"
        element={<SectionPage />}
      />
    </Routes>
  );
};

export default App;
