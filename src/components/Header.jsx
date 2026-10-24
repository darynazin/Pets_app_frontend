import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useDoctor } from "../contexts/DoctorContext";

function Header() {
  const { user, logout } = useUser();
  const { doctor, logoutVet } = useDoctor();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const handleLogout = () => {
    closeMobileMenu();
    if (user) logout();
    else if (doctor) logoutVet();
    navigate("/");
  };

  const navigationLinks = [
    { to: "/ai", label: "ASK VetAI" },
    ...(user ? [{ to: "/mypets", label: "MY Pets" }] : []),
    ...(doctor ? [{ to: "/vet/schedule", label: "My Appointments" }] : []),
    ...(!doctor ? [{ to: "/emergency", label: "Emergency", emergency: true }] : []),
  ];
  const profileLinks = [
    ...(user ? [{ to: "/profile", label: "Profile" }] : []),
    ...(doctor ? [{ to: "/vet/profile", label: "Profile" }] : []),
  ];
  const guestLinks = [
    { to: "/vet/login", label: "Are you a vet?" },
    { to: "/login", label: "Log In" },
    { to: "/signup", label: "Sign Up" },
  ];

  return (
    <header
      className="bg-base-100"
      onKeyDown={(event) => {
        if (event.key === "Escape" && mobileMenuOpen) {
          closeMobileMenu();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
        <Link to="/" className="shrink-0" onClick={closeMobileMenu} aria-label="VetiGo home">
          <img src="/logo.png" alt="VetiGo" className="w-24 h-auto sm:w-28" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-2 lg:flex">
          {navigationLinks.map(({ to, label, emergency }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `link link-hover whitespace-nowrap px-3 py-4 ${isActive ? "font-medium" : "font-regular"} ${emergency ? "text-red-500" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {user || doctor ? (
            <details className="dropdown dropdown-end">
              <summary className="btn btn-ghost btn-circle hover:bg-accent" aria-label="Account menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </summary>
              <ul
                className="menu dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
                onClick={(event) => {
                  if (event.target.closest("a, button")) {
                    event.currentTarget.closest("details").open = false;
                  }
                }}
              >
                {profileLinks.map(({ to, label }) => (
                  <li key={to}><Link to={to}>{label}</Link></li>
                ))}
                <li><button type="button" onClick={handleLogout}>Logout</button></li>
              </ul>
            </details>
          ) : (
            guestLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`btn whitespace-nowrap ${to === "/signup" ? "btn-neutral hover:btn-accent" : to === "/login" ? "btn-ghost border border-black" : "btn-ghost"}`}
              >
                {label}
              </Link>
            ))
          )}
        </div>

        <button
          ref={menuButton}
          type="button"
          className="btn btn-ghost btn-square shrink-0 lg:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 6l12 12M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"} />
          </svg>
        </button>
      </div>

      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!mobileMenuOpen} className="border-t border-base-200 px-4 py-3 lg:hidden">
        <ul className="menu w-full gap-1 p-0">
          {navigationLinks.map(({ to, label, emergency }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `min-h-12 ${isActive ? "font-medium bg-base-200" : ""} ${emergency ? "text-red-500" : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="menu mt-3 w-full gap-1 border-t border-base-200 px-0 pt-3">
          {(user || doctor ? profileLinks : guestLinks).map(({ to, label }) => (
            <li key={to}>
              <Link to={to} onClick={closeMobileMenu} className={`min-h-12 ${to === "/signup" ? "bg-neutral text-neutral-content" : ""}`}>
                {label}
              </Link>
            </li>
          ))}
          {(user || doctor) && <li><button type="button" onClick={handleLogout} className="min-h-12">Logout</button></li>}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
