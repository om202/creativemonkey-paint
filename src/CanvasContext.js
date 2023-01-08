import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.lineCap = "round";
    contextRef.current.lineJoin = "round";
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.lineCap = "round";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const strokeColor = (color = "rgb(0,0,0)") => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = 3;
    context.strokeStyle = color;
  };

  const eraser = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "white";
    context.lineWidth = 30;
  };

  const pencil = (size = 3) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = size;
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        strokeColor,
        eraser,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        pencil,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);