"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [password, setPassword] = useState("");
  const [errorMssg, setErrorMssg] = useState("");

  const router = useRouter();
  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setErrorMssg("Invalid password");
      return;
    } else {
      router.push("/adminDashboard");
      setPassword("");
    }
  };

  return (
    <div className="admin-login d-flex flex-column align-center justify-center">
      <div className="container">
        <div className="logos"></div>
        <div className="container-content d-flex flex-column align-center">
          <h2>RCF Q&A Admin Panel</h2>
          <p>Authorized Access Only</p>

          <fieldset className="d-flex flex-column mt-1">
            <label htmlFor="admin-passowrd">Admin Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMssg && <p className="errorMssg">{errorMssg}</p>}
          </fieldset>
          <button onClick={handleLogin}>Login to Admin Panel</button>

          <p>Contact system administrator if you need access</p>
        </div>
      </div>
    </div>
  );
}
