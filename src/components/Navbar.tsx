"use client";

import React, { useState } from "react";
import Icon from "./Icon";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-gray-200 drop-shadow-lg">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link href="/">
          <span className="self-center ml-2 font-display text-xl whitespace-nowrap tracking-wider">
            ☄️ Property Scanner
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center rounded-lg md:hidden"
          aria-controls="navbar-solid-bg"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <Icon name="bars-3" className="w-6 h-6" />
        </button>
        <div
          className={`w-full md:block md:w-auto ${!menuOpen ? "hidden" : ""}`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col mt-4 font-medium text-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-800 md:p-0 "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-800 md:p-0 "
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-800 md:p-0 "
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
