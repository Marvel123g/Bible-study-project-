"use client";
import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <div className="home d-flex align-center justify-center">
      <div className="container">
        <Link href="/login">
          <button className="adminBtn ">Admin Login</button>
        </Link>
        <div className="drop-down d-flex flex-column align-center">
          <h1>Welcome to RCF LASU OJO Bible Study.</h1>
          <Link href="/dashboard">
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
