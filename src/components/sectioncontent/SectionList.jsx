//SectionList.jsx

import "./SectionList.css";

import React, { useState, useEffect } from "react";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useStock } from "../../context/StockContext";

// Components
import SectionItem from "./SectionItem";

const SectionList = ({ updateTrigger }) => {
  const [sections, setSections] = useState([]);
  const { getDocuments } = useHandleDocuments();
  const { stockId } = useStock();

  // Get sections from Firebase
  const fetchSections = async () => {
    const currentSections = (await getDocuments("estoques", stockId)) || [];
    setSections(currentSections);
    console.log(currentSections);
  };

  useEffect(() => {
    fetchSections();
    updateTrigger = 0; // Retornamos updateTrigger para seu estado inicial
  }, [stockId, updateTrigger]);

  return (
    // section-list
    <div className="section-list">
      <h2>Linhas</h2>
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
            // setSections
            setSections={setSections}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionList;
