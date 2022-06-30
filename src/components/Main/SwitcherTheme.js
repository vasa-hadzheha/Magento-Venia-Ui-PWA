import React, { useContext } from "react";
import "./style.css";
import DarkModeToggle from "react-dark-mode-toggle";
import { DarkThemeContext } from "./DarkThemeContext";

export default function SwitcherTheme() {
  const { turnOn, setTurnOn, mainColor } = useContext(DarkThemeContext);

  return (
    <div
      className="App"
      style={{
        backgroundColor: mainColor.bg,
        //color: mainColor.txt,
        height: "100vh"
      }}
    >
      <DarkModeToggle onChange={setTurnOn} checked={turnOn} size={80} />
      <div style={{ color: mainColor.txt }}>
        <h1>HELLO VASYL</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </div>
  );
}