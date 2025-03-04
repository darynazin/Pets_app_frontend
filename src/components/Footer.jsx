import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-gray-100 text-base-content p-10">
        <aside>
          <Link to="/" className="link w-20 h-auto">
            <img src="/logo-secondary.png" alt="VetiGo" />
          </Link>
          <p>
            © {getCurrentYear()} VetiGO. All rights reserved.
            <br />
            Reliable Care When Your Pet Needs It Most.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/" className="link link-hover">
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
        <nav>
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
        <nav>
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
