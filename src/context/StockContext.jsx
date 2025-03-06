import { createContext, useContext, useState } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stockId, setStockId] = useState(null);
  const [stockName, setStockName] = useState("");

  return (
    <StockContext.Provider
      value={{ stockId, setStockId, stockName, setStockName }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  return useContext(StockContext);
};
