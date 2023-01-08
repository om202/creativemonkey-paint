import React from "react";
import { Canvas } from "./Canvas";
import { ButtonsGroup } from "./ButtonsGroup/ButtonsGroup";
import { Logo } from "./Logo/Logo";
import { FloatingHelper } from "./FloatingHelper/FloatingHelper";

function App() {
  return (
    <>
      <Canvas />
      <FloatingHelper initial={[30, 30]}>
        <Logo />
      </FloatingHelper>
      <FloatingHelper initial={[30, 75]}>
        <ButtonsGroup />
      </FloatingHelper>
    </>
  );
}

export default App;
