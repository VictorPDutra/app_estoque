//App.jsx

import { Routes, Route } from "react-router-dom";
import StockManagement from "./pages/StockManagement";
import StockPage from "./pages/StockPage";
import SectionPage from "./pages/SectionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StockManagement />} />
      <Route path="/stock/:id" element={<StockPage />} />
      <Route
        path="/stock/:stockId/sections/:sectionId"
        element={<SectionPage />}
      />
    </Routes>
  );
};

export default App;
