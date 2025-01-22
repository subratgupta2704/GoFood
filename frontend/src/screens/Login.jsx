import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div
      style={{
        backgroundColor: "#8EC3B0",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          backgroundColor: "#1B4242",
          width: "400px",
          height: "315px",
          padding: "20px",
          borderRadius: "10px",
          zIndex: 1,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h1 style={{ textAlign: "center", color: "#677D6A" }}>
              {" "}
              !! Log In !!
            </h1>
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ color: "#ECF4D6", fontWeight: "bold" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              style={{ color: "#ECF4D6", fontWeight: "bold" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your Password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{
              color: "#003C43",
              backgroundColor: "#5C8374",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
