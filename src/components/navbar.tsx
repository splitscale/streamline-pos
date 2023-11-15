import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GiImpactPoint } from "react-icons/gi";
import { BiLogoBlogger } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { FaPeopleCarry } from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";
import { AiOutlineClose, AiOutlineHome, AiOutlineMenu } from "react-icons/ai";



export const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navBackground = isScrolled ? "bg-white" : "bg-transparent";

  const handleNav = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className=""
    >
      <div className="flex h-full w-full items-center justify-between px-4">
        STREAMLINE

        {/* Navigation for lg to xl view */}
        

        <div className="hidden justify-end lg:flex">
          <Link
            href="/dashboard"
            className="mx-4 rounded bg-blue-700 px-6 py-2 font-bold text-white hover:bg-blue-800"
          >
            LOG IN
          </Link>
        </div>

        {/* Hamburger menu */}
        <div className="lg:hidden">
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      {/* Dropdown menu for sm to md view */}
      <div
        className={`fixed left-0 top-0 h-screen w-full transform bg-white ${
          menuOpen
            ? "translate-y-0 transition-transform ease-in"
            : "-translate-y-full"
        } px-4 py-2 duration-500 lg:hidden`}
      >
        {/* Close button for sm to md view */}
        <div className="mb-4 flex items-center justify-between">
          <img
            src="gsi-logo2.png"
            height={90}
            width={90}
            alt="logo"
            className="cursor-pointer"
          />
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineClose size={25} />
          </div>
        </div>

        {/* Navigation links for sm to md view */}
        
      </div>
    </nav>
  );
};
