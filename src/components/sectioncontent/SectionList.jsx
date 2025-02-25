//SectionList.jsx

import "./SectionList.css";

import React, { useState, useEffect } from "react";
import SectionItem from "./SectionItem";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";

const SectionList = ({ stockId, updateTrigger }) => {
  const [sections, setSections] = useState([]);
  const { getDocuments } = useHandleDocuments();

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
