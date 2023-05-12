import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import {Button} from "semantic-ui-react"
import { useStateContext } from "../contexts/ContextProvider";

// export const themeColors = [
//     {
//       name: "blue-theme",
//       color: "#1A97F5",
//     },
//     {
//       name: "green-theme",
//       color: "#03C9D7",
//     },
//     {
//       name: "purple-theme",
//       color: "#7352FF",
//     },
//     {
//       name: "red-theme",
//       color: "#FF5C8E",
//     },
//     {
//       name: "indigo-theme",
//       color: "#1E4DB7",
//     },
//     {
//       color: "#FB9678",
//       name: "orange-theme",
//     },
//   ];
const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings, themeSettings } =
    useStateContext();
  return (
    <div className="theme-main">
      <div className={`theme-float-right ${themeSettings?'show':'hide'}`}>
        <div className="theme-tooltip">
          <p className="theme-text">Settings</p>
          <Button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="theme-button"
          >
            <MdOutlineCancel />
          </Button>
        </div>
        <div className="theme-container">
          <p className="theme-heading">Theme Options</p>
          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 cursor-pointer">
              {" "}
              Light
            </label>
          </div>
          <div className="mt-4">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 cursor-pointer">
              {" "}
              Dark
            </label>
          </div>
        </div>
        {/* <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => {
              {
                console.log(currentColor);
              }
              {
                console.log(item.color);
              }
              return (
                <TooltipComponent
                  key={index}
                  content={item.name}
                  position="TopCenter"
                >
                  <div className="relative mt-2 cursor-pointer flex gap-5 items-center">
                    <button
                      type="button"
                      className="h-10 w-10 rounded-full cursor-pointer"
                      style={{ backgroundColor: item.color }}
                      onClick={() => setColor(item.color)}
                    >
                      <BsCheck
                        className={`ml-2 text-2xl text-white ${
                          currentColor === item.color ? "block" : "hidden"
                        }`}
                      />
                    </button>
                  </div>
                </TooltipComponent>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ThemeSettings;
