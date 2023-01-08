import React from "react";
import { Canvas } from "./Canvas";
import { ButtonsGroup } from "./ButtonsGroup/ButtonsGroup";
import { Logo } from "./Logo";
import { FloatingHelper } from "./floating-helper/floatingHelper";

function App() {
  return (
    <>
      <Canvas />
      <Logo />
      <FloatingHelper initial={[30,75]}>
        <ButtonsGroup/>
      </FloatingHelper>
    </>
  );
}

export default App;
