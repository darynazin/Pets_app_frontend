import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar bg-base-100 px-10">
        <Link to="/" className="navbar-start">
          <img src="/logo.png" alt="logo" />
        </Link>
        <div className="navbar-center">
          <a className="link link-hover p-4 text-xl">ASK VetAI</a>
          {user && (
            <Link to="/mypets" className="link link-hover p-4 text-xl">
              MY PETS
            </Link>
          )}
          <Link
            to="/emergency"
            className="link link-hover p-4 text-xl  text-red-500"
          >
            Emergency
          </Link>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
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
            <>
              <Link to="/" className="link link-hover px-4 min-w-max">
                Are you a vet?
              </Link>
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-neutral">
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-neutral">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
