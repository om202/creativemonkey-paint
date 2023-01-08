import React from "react"
import {GiMonkey} from 'react-icons/gi'
import './Logo.css';

export const Logo = () => {
  return (
    <div className="logo">
     <GiMonkey className="logo-pic"/>  <span className="logo-text">Creative Monkey</span> <span>Beta</span>
    </div>
  )
}