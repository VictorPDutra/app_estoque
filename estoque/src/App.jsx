//App.jsx

import { Routes, Route } from "react-router-dom";
import StockManagement from "./components/StockManagement";
import StockPage from "./pages/StockPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StockManagement />} />
      <Route path="/stock/:id" element={<StockPage />} />
    </Routes>
  );
};

export default App;
