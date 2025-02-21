import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Header() {
  const { user, logout } = useUser();

  return (
    <>
      <div className="navbar bg-base-100 px-10">
        <Link to="/" className="navbar-start">
          <img src="/logo.png" alt="logo" />
        </Link>
        <div className="navbar-center">
          <a className="link link-hover p-4 text-xl">ASK VetAI</a>
          <Link to="/mypets" className="link link-hover p-4 text-xl">
            MY PETS
          </Link>
          <Link
            to="/emergency"
            className="link link-hover p-4 text-xl  text-red-500"
          >
            Emergency
          </Link>
        </div>
        <div className="navbar-end">
          <Link to="/" className="link link-hover px-4 min-w-max">
            Are you a vet?
          </Link>
          {user ? (
            <button onClick={logout} className="btn btn-neutral">
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-neutral">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-neutral">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
