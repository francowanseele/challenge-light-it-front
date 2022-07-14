import React from "react";

import { logout } from "../../api/auth";

export default function Navbar() {
	const logoutLocal = () => {
		logout();
		window.location.href = "/";
	}

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <h1
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Light-it Challenge
            </h1>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center flex"
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug"
                  onClick={() => logoutLocal()}
                >
                  <span className="ml-2">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
