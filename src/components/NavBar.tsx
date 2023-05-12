import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import {AiOutlineBars} from "react-icons/ai"
import { useStateContext } from "../contexts/ContextProvider";
import {
   Button,
   Icon
  } from 'semantic-ui-react'
  
// const avatar = require("../data/avatar.jpg");

interface NavButtonProps {
  title?: string;
  customFunc?: any;
  icon?: any;
  color?: any;
  dataColor?: any;
}
const NavButton: React.FC<NavButtonProps> = ({
  title,
  customFunc,
  icon,
  color,
  dataColor,
}) => {
  return (
    // <TooltipComponent content={title} position="BottomCenter">
    //   <button
    //     type="button"
    //     onClick={customFunc}
    //     style={{ color }}
    //     className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    //   >
    //     <span
    //       style={{ background: dataColor }}
    //       className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    //     />

    //     {icon}
    //   </button>
    // </TooltipComponent>
    <Button onClick={customFunc} className="sidebar-navbutton"> <span
           style={{ background: dataColor }}
           className="icon"
         />{icon}</Button>
  );
};
const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className="navbar">
      <NavButton
        title="menu"
        customFunc={() => {
          setActiveMenu((prevMenu: any) => {
            return !prevMenu;
          });
        }}
        color={currentColor}
        icon={<AiOutlineBars/>}
      />
    </div>
  );
};

export default Navbar;
