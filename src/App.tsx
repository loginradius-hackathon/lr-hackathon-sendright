import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import {Button } from 'semantic-ui-react'
import { Navbar, Footer, Sidebar } from "./components";

import "./App.scss";

import { useStateContext } from "./contexts/ContextProvider";
import Generate from "./pages/Generate";
import Branding from "./pages/Branding";
import Settings from "./pages/Settings";
import ThemeSettings from "./components/ThemeSettings";
const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  return (
    <div className={`${currentMode === "Dark" ? "dark" : "light"}`}>
      <BrowserRouter>
        <div className="container">
          <div className="theme-tooltip-main " style={{ zIndex: "1000" }}>
            <div >
              <Button
                type="button"
                className="theme-tooltip-main-button"
                style={{ backgroundColor: currentColor, borderRadius: "50%" }}
                onClick={() => {
                  setThemeSettings(true);
                }}
              >
                <FiSettings />
              </Button>
            </div>
          </div>
          {/* {activeMenu ? (
             <div className="sidebar-main">
             <Sidebar />
           </div>
          ) : (
            <div className="sidbar-main-closed">
              <Sidebar />
            </div>
          )} */}
            <Sidebar />
          
          <div
            className={`active ${
              activeMenu ? " activemenu" : "notactivemenu"
            }`}
          >
            <div className="navbar-main">
              <Navbar />
            </div>

            <div>
              <ThemeSettings />
              <Routes>
              <Route path="/generate" element={<Generate />} />
                <Route path="/branding" element={<Branding />} />
                <Route path="/settings" element={<Settings />} />
                {/* <Route path="/" element="Ecommerce" />
                
                <Route path="/customers" element={<Customers />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
