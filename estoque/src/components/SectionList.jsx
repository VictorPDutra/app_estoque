//SectionList.jsx

import "./SectionList.css";

import React, { useState, useEffect } from "react";
import SectionItem from "./SectionItem";
import { getFromLocalStorage } from "../utils/storage";

const SectionList = ({ stockId, updateTrigger }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const storedSections = getFromLocalStorage(stockId) || [];
    setSections(storedSections);
    updateTrigger = 0; // Retornamos updateTrigger para seu estado inicial
  }, [stockId, updateTrigger]);

  return (
    // section-list
    <div className="section-list">
      <h2>Seções</h2>
      {/* section-items */}
      <div className="section-items">
        {/* products.map((section) */}
        {sections.map((section) => (
          // SectionItem
          <SectionItem
            // section.id
            key={section.id}
            // section
            section={section}
            // Mantem como stockId
            stockId={stockId}
            // setSections
            setSections={setSections}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionList;
