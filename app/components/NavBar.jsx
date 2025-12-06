"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavBar({ handleRefresh }) {
  const [activeLink, setActiveLink] = useState("dashboard");

  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setActiveLink("dashboard");
        break;
      case "/ask-questions":
        setActiveLink("ask-questions");
        break;
      case "/browse-questions":
        setActiveLink("browse-questions");
        break;
      case "/about":
        setActiveLink("about");
        break;

      default:
        setActiveLink("dashboard");
        break;
    }
  }, [pathname]);
  return (
    <nav>
      <img src="./images/header-wallpaper.png" alt="" className="hero" />
      <div className="nav-content d-flex flex-column align-center text-center">
        <div className="images d-flex align-center gap-1">
          <img src="./images/rcf-logo-white.png" alt="" />
          <img src="./images/the-forge-logo.png" alt="" />
        </div>
        <h1 className="mt-1">RCFLASUOJO Bible Study (The Forge)</h1>
        <p>
          "Ask, and it shall be given to you; seek, and you will find. You are
          free to ask questions; you will get a response"
        </p>
        <div className="btns d-flex gap-1 mt-2" onClick={handleRefresh}>
          <Link
            href="/dashboard"
            className={`btn ${
              activeLink === "dashboard" ? "active" : ""
            } rounded-1`}
          >
            Home
          </Link>
          <Link
            href="/ask-questions"
            className={`btn ${
              activeLink === "ask-questions" ? "active" : ""
            } rounded-1`}
          >
            Ask Questions
          </Link>
          <Link
            href="/browse-questions"
            className={`btn ${
              activeLink === "browse-questions" ? "active" : ""
            } rounded-1`}
          >
            Browse Questions
          </Link>
          <Link
            href="/about"
            className={`btn ${
              activeLink === "about" ? "active" : ""
            } rounded-1`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
