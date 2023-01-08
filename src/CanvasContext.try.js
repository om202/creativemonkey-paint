import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [pencilColor, setPencilColor] = useState("black");
  const [pencilSize, setPencilSize] = useState(3);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const defaultEraserWidth = 30;
  var points = [];

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
    context.strokeStyle = pencilColor;
    context.lineWidth = pencilSize;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // contextRef.current.beginPath();
    // contextRef.current.lineCap = "round";
    // contextRef.current.lineJoin = "round";
    // contextRef.current.moveTo(offsetX, offsetY);
    points.push({
      x: offsetX,
      y: offsetY,
    });
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    points = [];
    setIsDrawing(false);
  };

  function drawPoints(points) {
    // draw a basic circle instead
    if (points.length < 6) {
      var b = points[0];
      contextRef.current.beginPath();
      contextRef.current.arc(b.x, b.y, contextRef.current.lineWidth / 2, 0, Math.PI * 2, !0);
      contextRef.current.closePath();
      contextRef.current.fill();
      return;
    }
    contextRef.current.beginPath();
     contextRef.current.moveTo(points[0].x, points[0].y);

    let i;
    // draw a bunch of quadratics, using the average of two points as the control point
    for (i = 1; i < points.length - 2; i++) {
      console.log('here')
      var c = (points[i].x + points[i + 1].x) / 2,
        d = (points[i].y + points[i + 1].y) / 2;
      contextRef.current.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }
    contextRef.current.quadraticCurveTo(
      points[i].x,
      points[i].y,
      points[i + 1].x,
      points[i + 1].y
    );

    contextRef.current.stroke();
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    points.push({
      x: offsetX,
      y: offsetY,
    });
    drawPoints(points);
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
