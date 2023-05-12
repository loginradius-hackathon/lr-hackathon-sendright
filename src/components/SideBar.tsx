import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
    Icon,
    Button
} from 'semantic-ui-react'
import { useStateContext } from "../contexts/ContextProvider";
export const links = [

    {
        links: [
            {
                name: "Generate",
                icon: <Icon name="write" />,
            },
            {
                name: "Branding",
                icon: <Icon name="paint brush" />,
            },
            {
                name: "Settings",
                icon: <Icon name="settings" />,
            },
        ],
    },

];


const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize, currentColor } =
        useStateContext();

    const handleCloseSidebar = () => {
        if (activeMenu === true && screenSize <= 900) {
            setActiveMenu(false);
        }
    };
    const activeLink =
        "activelink ";

    const normalLink =
        "normallink";
    return (


        <div className={` sidebar ${activeMenu ? 'show' : 'hide'}`}>

            <>
                <div className="sidebar-inner">
                    <Link
                        to="/"
                        onClick={() => {
                            handleCloseSidebar();
                        }}
                        className="sidebar-link"
                    >
                        < Icon name="mail" /> SendRight
                    </Link>
                    {/* <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => {
                  setActiveMenu((prevMenu: any) => {
                    return !prevMenu;
                  });
                }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent> */}
                </div>
                <div className="sidebar-elements">
                    {links.map((item) => {
                        return (
                            <>

                                <div>
                                    <Button

                                        onClick={() => {
                                            setActiveMenu((prevMenu: any) => {
                                                console.log("setting")
                                                return !prevMenu;
                                            });
                                        }}
                                        className="sidebar-button"
                                    >
                                        <MdOutlineCancel />
                                    </Button>
                                </div>
                                {item.links.map((link: any) => {
                                    return (
                                        <NavLink
                                            to={`/${link.name}`}
                                            key={`/${link.name}`}
                                            onClick={() => {
                                                handleCloseSidebar();
                                            }}
                                            style={({ isActive }: any) => {
                                                return isActive
                                                    ? { backgroundColor: currentColor, color: "#0f0f0f" }
                                                    : {};
                                            }}
                                            className={({ isActive }: any) => {
                                                return isActive ? activeLink : normalLink;
                                            }}
                                        >
                                            {link.icon}
                                            <span className="capitalize">{link.name}</span>
                                        </NavLink>
                                    );
                                })}

                            </>
                        );
                    })}
                </div>
            </>

        </div>
    );
};

export default Sidebar;
