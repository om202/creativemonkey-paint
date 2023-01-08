import React from "react";
import { GiMonkey } from "react-icons/gi";
import { Tooltip } from "../Tooltip/Tooltip";
import "./Logo.css";

export const Logo = () => {
  return (
    <Tooltip text={'Move Logo'}>
      <div className="logo">
        <GiMonkey className="logo-pic" />{" "}
        <span className="logo-text">Creative Monkey</span> <span>Beta</span>
      </div>
    </Tooltip>
  );
};
