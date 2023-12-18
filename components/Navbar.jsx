"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

const Navbar = ({name,role,isLogin}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathName = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = async () =>{ 
    const response = await axios.post("/api/logout");
    console.log(response);
    localStorage.clear();
    window.location.href = "/";
  }

  if (
    pathName === "/login" ||
    pathName === "/register" ||
    pathName.startsWith("/dashboard")
  ) {
    return null;
  }
  
  const openNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <header className="bg-primary w-full py-2 flex justify-between items-center px-4 md:px-8 relative border-b border-slate-200 lg:px-20">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={100}
          className="w-24 sm:w-28"
        />
      </Link>
      <nav className="h-full flex items-center">
        <ul
          className={`flex gap-2 flex-col px-4 py-4 md:py-0 h-full fixed z-20  top-0 right-0 w-44 md:w-fit bg-primary text-white rounded-l-md transition-transform duration-200 ease-in-out md:p-0 md:static md:flex-row md:translate-x-0  ${
            navbarOpen
              ? "transform translate-x-0 "
              : "transform translate-x-full"
          }`}
        >
          <button
            className="self-start bg-secondary p-1 rounded-md md:hidden mb-3"
            onClick={openNavbar}
          >
            <FiX size={32} />
          </button>
          <Link href={"/"} className="p-1 text-md ">
            Home
          </Link>
          <Link href={"/"} className="p-1 text-md ">
            Doctor
          </Link>
          <Link href={"/"} className="p-1 text-md ">
            Facilities
          </Link>
          <Link href={"/"} className="p-1 text-md ">
            Gallery
          </Link> 
          {isLogin ? <div className="relative"><button
            className=" bg-secondary text-white rounded-md px-4 py-2"
            onClick={toggleDropdown}
          >
            <p className="line-clamp-1 w-full text-sm">{name}</p>
          </button>
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link href={'/appointment/my-appointment'}
                  className="block px-3 text-center py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  role="menuitem"
                >
                  My Appointment
                </Link>
                {role === "Super Admin" || role ==="Doctor" ? (
                <Link href={'/dashboard/patient'}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  role="menuitem"
                >
                  Dashboard
                </Link>
                ) : null}
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          </div> : (
            <>
              {" "}
              <Link
                href={"/login"}
                className=" px-3 py-1 text-md border-secondary border-2 rounded-md text-center"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className=" text-md bg-secondary rounded-md px-3 py-1 text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </ul>
        <button
          className="bg-secondary p-1 rounded-md lg:hidden text-white md:hidden"
          onClick={openNavbar}
        >
          <FiMenu size={32} />
        </button>
      </nav>
    </header>
  );
};


export default Navbar;
