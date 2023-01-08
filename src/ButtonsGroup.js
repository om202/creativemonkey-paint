import React from "react";
import { useCanvas } from "./CanvasContext";
import { BsEraserFill, BsPencilFill } from "react-icons/bs";
import {GrClearOption} from 'react-icons/gr'
export const ButtonsGroup = () => {
  const { clearCanvas, strokeColor, eraser, pencil } = useCanvas();

  function getRgb(colorhex) {
    const color = colorhex;
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <div className="buttons-group">
      <button className="buttons-style" onClick={eraser}>
        <BsEraserFill />
      </button>
      <button className="buttons-style" onClick={()=>pencil(3)}>
        <div className="pencil-small pencil"/>
      </button>
      <button className="buttons-style" onClick={()=>pencil(8)}>
        <div className="pencil-medium pencil"/>
      </button>
      <button className="buttons-style" onClick={()=>pencil(13)}>
        <div className="pencil-large pencil"/>
      </button>
      <button className="buttons-style" onClick={clearCanvas}>
        <GrClearOption />
      </button>
      <button className="buttons-style">
        <input
          type="color"
          id="color-picker"
          onChange={(e) => strokeColor(getRgb(e.target.value))}
        />
      </button>
    </div>
  );
};
