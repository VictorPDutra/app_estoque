import { createContext, useContext, useState } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stockId, setStockId] = useState(null);

  return (
    <StockContext.Provider value={{ stockId, setStockId }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  return useContext(StockContext);
};
