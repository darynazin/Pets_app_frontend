import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-gray-100 text-base-content p-10 justify-items-center text-center sm:justify-items-start sm:text-left">
        <aside className="justify-items-center sm:justify-items-start">
          <Link
            to="/"
            className="link w-20 h-auto"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src="/logo-secondary.png" alt="VetiGo" />
          </Link>
          <p>
            © {getCurrentYear()} VetiGO. All rights reserved.
            <br />
            <span className="font-medium">
              Reliable Care When Your Pet Needs It Most.
            </span>
          </p>
        </aside>
        <nav className="justify-items-center sm:justify-items-start">
          <h6 className="footer-title">Services</h6>
          <Link to="/ai" className="link link-hover">
            Ask VetAI
          </Link>
          <Link to="/search" className="link link-hover">
            Find A Vet
          </Link>
          <Link to="/search" className="link link-hover">
            Appointment Booking
          </Link>
          <Link to="/emergency" className="link link-hover">
            Emergency Contacts
          </Link>
        </nav>
        <nav className="justify-items-center sm:justify-items-start">
          <h6 className="footer-title">Company</h6>
          <Link to="/company/about" className="link link-hover">
            About us
          </Link>
          <Link to="/company/contact" className="link link-hover">
            Contact
          </Link>
          <Link to="/company/help" className="link link-hover">
            Help
          </Link>
        </nav>
        <nav className="justify-items-center sm:justify-items-start">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
