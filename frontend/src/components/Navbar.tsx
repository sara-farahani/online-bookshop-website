import { useState, useEffect } from "react";

import { navLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import logout from "../lib/api/auth/logout";
import { useAuth } from "../contexts/login";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedin, setIsLoggedin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <Link to="/" className="logo">
          کتابینو
        </Link>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <Link to={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex ">
          <div className="nav-btn group cursor p-1">
            <div className="inner">
              {!isLoggedin ? (
                <Link to="/login">
                  <span>ثبت‌نام/ ورود</span>
                </Link>
              ) : (
                <button
                  onClick={async () => {
                    setError("");
                    const response = await logout();
                    if (response.error) {
                      setError(response.error);
                    } else {
                      setIsLoggedin(false);
                      navigate("/");
                    }
                  }}
                  className="logout-btn cursor"
                >
                  <span>خروج</span>
                </button>
              )}
            </div>
          </div>

          <a className="nav-btn group p-1 cursor">
            <div className="inner">
              <Link to="./cart">
                <span>سبد خرید</span>
              </Link>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
