import React from "react";
import Draggable from "react-draggable";
import { ButtonsGroup } from "../ButtonsGroup";

export const FloatingHelper = ({ children, initial }) => {
  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      positionOffset={{ x: initial[0], y: initial[1] }}
      position={null}
      scale={1}
    >
      <div className="floating-helper">{children}</div>
    </Draggable>
  );
};
