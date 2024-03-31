import "../styles/HeaderStyles.css";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import Authservice from "../utils/auth"; 

export default function Header() {
  const { pathname } = useLocation();
  const [burger, setBurger] = useState(false);
  const toggleBurger = () => setBurger(!burger);
  const authService = new Authservice();

  useEffect(() => {
    setBurger(false);
  }, [pathname]);

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            <h1>Erin's Date Planner</h1>
          </Link>
        </div>
        <ul className={burger ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link
              to="/date"
              className={pathname === "/date" ? "active-nav-item" : "nav-item"}
            >
              Date Generator
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={
                pathname === "/contact" ? "active-nav-item" : "nav-item"
              }
            >
              Contact
            </Link>
          </li>
          {authService.loggedIn() ? (
            <li>
              <Link
                to="/signout"
                className={
                  pathname === "/signout" ? "active-nav-item" : "nav-item"
                }
              >
                Sign Out
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/signin"
                  className={
                    pathname === "/signin" ? "active-nav-item" : "nav-item"
                  }
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={
                    pathname === "/signup" ? "active-nav-item" : "nav-item"
                  }
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="burger" onClick={toggleBurger}>
          {burger ? (
            <IoCloseOutline size={35} color={"#fff"} />
          ) : (
            <IoMenuOutline size={35} color={"#fff"} />
          )}
        </div>
      </nav>
    </header>
  );
}
