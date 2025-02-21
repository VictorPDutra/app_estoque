//main.jsx

import React from "react";
import ReactDOM from "react-dom/client"; // Corrija para 'react-dom/client'
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*Usado HashRouter no lugar de BrowserRouter pois GiHub não suporta SPA*/}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
