import React from "react";
import './Tooltip.css';

export const Tooltip = ({ text, children }) => {
  return (
    <div class="tooltip">
      {children}
      <span class="tooltiptext">{text}</span>
    </div>
  );
};
