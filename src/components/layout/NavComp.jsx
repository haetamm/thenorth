import { useState } from "react";
import { GiWorld } from "react-icons/gi";
import useScroll from "@/hooks/useScroll";
import ToggleSidebar from "./ToggleSidebar";
import GuestNavbar from "./GuestNavbar";

const NavComp = ({ guest }) => {
  const { visible, transparent } = useScroll();

  return (
    <div className=" w-full z-10  ">
      <GuestNavbar guest={guest} />
      <div
        className={` ${
          visible ? "navbarCustom--visible" : "navbarCustom--hidden"
        } ${
          transparent
            ? "bg-black/20 backdrop-blur-sm  md:bg-transparent"
            : "bg-black/10 backdrop-blur-sm  shadow-lg"
        } px-3 w-full flex md:hidden justify-between items-center top-0 z-40 fixed py-3`}
      >
        <div className="focus:outline-none w-24">
          <GiWorld className="hidden md:block" />
        </div>
        <ToggleSidebar />
      </div>
    </div>
  );
};

export default NavComp;
