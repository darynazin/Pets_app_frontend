import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useDoctor } from "../contexts/DoctorContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useUser();
  const { doctor, logoutVet } = useDoctor();
  const navigate = useNavigate();

  if (user && doctor) {
    console.warn("Both user and doctor are logged in. This shouldn't happen!");
  }

  return (
    <div className="navbar bg-base-100 px-10">
      <Link to="/" className="navbar-start">
        <img src="/logo.png" alt="logo" className="w-28 h-auto" />
      </Link>
      <div className="navbar-center">
        <Link
          to="/ai"
          className={`link link-hover p-4 text-md ${
            location.pathname === "/ai" ? "font-medium" : "font-regular"
          }`}
        >
          ASK VetAI
        </Link>
        {user && (
          <Link
            to="/mypets"
            className={`link link-hover p-4 text-md ${
              location.pathname === "/mypets" ? "font-medium" : "font-regular"
            }`}
          >
            MY Pets
          </Link>
        )}
        {doctor && (
          <Link
            to="/vet/schedule"
            className={`link link-hover p-4 text-md ${
              location.pathname === "/appointments"
                ? "font-medium"
                : "font-regular"
            }`}
          >
            My Appointments
          </Link>
        )}
        {!doctor && (
          <Link
            to="/emergency"
            className={`link link-hover p-4 text-md text-red-500 ${
              location.pathname === "/emergency"
                ? "font-medium"
                : "font-regular"
            }`}
          >
            Emergency
          </Link>
        )}
      </div>
      <div className="navbar-end">
        {user || doctor ? (
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {user && (
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                )}
                {doctor && (
                  <li>
                    <Link to="vet/profile">Profile</Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      if (user) {
                        logout();
                      } else if (doctor) {
                        logoutVet();
                      }
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          !doctor && (
            <div className="flex gap-2 items-center">
              <Link to="/vet/login" className="btn btn-ghost">
                Are you a vet?
              </Link>
              <Link to="/login" className="btn btn-ghost border border-black">
                Log In
              </Link>
              <Link
                to="/signup"
                className="btn btn-neutral  hover:btn-accent transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Header;
