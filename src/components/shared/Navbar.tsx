import React from "react";
import Image from "next/image";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <div className="navbar bg-[#F8F9FA] border-b border-gray-200 px-4 md:px-8 lg:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-[#0F4C5C]"
          >
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />   
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/help-request">Help Request</NavLink>
            </li>
            <li>
              <NavLink href="/help-seekers">Help Seekers</NavLink>
            </li>
            <li>
              <NavLink href="/donate">Donate</NavLink>
            </li>
            <li>
              <NavLink href="/about">About</NavLink>
            </li>
            <li>
              <NavLink href="/login">Login</NavLink>
            </li>
          </ul>
        </div>

        <NavLink href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="CareBridge Logo"
            width={52}
            height={52}
            className="object-contain"
          />

          <div className="text-xl font-bold text-[#0F4C5C]">
            Care<span className="text-[#FB8B24]">Bridge</span>
          </div>
        </NavLink>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <NavLink
              href="/"
              className="text-[#1D2D44] hover:text-[#0F4C5C] font-medium"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              href="/help-request"
              className="text-[#1D2D44] hover:text-[#0F4C5C] font-medium"
            >
              Help Request
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/help-seekers"
              className="text-[#1D2D44] hover:text-[#0F4C5C] font-medium"
            >
              Help Seekers
            </NavLink>
          </li>

          <li>
            <NavLink
              href="/donate"
              className="text-[#1D2D44]  font-medium"
            >
              Donate
            </NavLink>
          </li>

          <li>
            <NavLink
              href="/about"
              className="text-[#1D2D44] hover:text-[#0F4C5C] font-medium"
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end md:flex hidden">
        <NavLink
          href="/login"
          className="px-5 py-2 rounded-lg btn btn-outline border border-[#0F4C5C] hover:text-white font-medium hover:bg-[#0F4C5C] "
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;