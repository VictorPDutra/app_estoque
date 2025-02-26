//App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// Context
import { AuthProvider } from "./context/AuthContext";
import { StockProvider } from "./context/StockContext";

// Components
import StockPage from "./components/stock/StockPage";
import SectionPage from "./components/section/SectionPage";
import Navbar from "./components/Navbar/Navbar";

// Pages
import StockManagement from "./pages/stocks/StockManagement";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import Register from "./pages/register/Register";

const App = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  // Futuro loading
  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <AuthProvider value={{ user }}>
        <StockProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/app_estoque" />} />
            {/* Redireciona */}
            <Route
              path="/app_estoque"
              element={user ? <StockManagement /> : <Navigate to="/login" />}
            />
            <Route
              path="/app_estoque/stock/:id"
              element={user ? <StockPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/app_estoque/stock/:stockId/sections/:sectionId"
              element={user ? <SectionPage /> : <Navigate to="/login" />}
            />
            <Route path="/home" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </StockProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
