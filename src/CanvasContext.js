import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [pencilColor, setPencilColor] = useState("black");
  const [pencilSize, setPencilSize] = useState(3);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const defaultEraserWidth = 30;

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = pencilColor;
    context.lineWidth = pencilSize;
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
    context.lineWidth = pencilSize;
    setPencilColor(color);
    context.strokeStyle = color;
  };

  const eraser = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "white";
    context.lineWidth = defaultEraserWidth;
  };

  const pencil = (size = pencilSize) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = pencilColor;
    context.lineWidth = size;
    setPencilSize(size);
    contextRef.current = context;
  };

  const saveAsImage = () => {
    const canvas = canvasRef.current;
    //cache height and width
    var w = canvas.width;
    var h = canvas.height;
    var data;
    data = contextRef.current.getImageData(0, 0, w, h);
    var compositeOperation = contextRef.current.globalCompositeOperation;
    contextRef.current.globalCompositeOperation = "destination-over";
    contextRef.current.fillStyle = "white";
    contextRef.current.fillRect(0, 0, w, h);
    var imageData = canvas.toDataURL("image/png");
    contextRef.current.clearRect(0, 0, w, h);
    contextRef.current.putImageData(data, 0, 0);
    contextRef.current.globalCompositeOperation = compositeOperation;
    var a = document.createElement('a');
    a.href = imageData;
    a.download = 'My-creative-work.png';
    document.body.appendChild(a);
    a.click();

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
        saveAsImage,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
