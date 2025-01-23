import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dynamic base URL
    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://gofood-bt3j.onrender.com";

    try {
      const response = await fetch(`${baseURL}/api/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        alert("Account created successfully! Please log in.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
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
            width: "700px",
            height: "500px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h1 style={{ textAlign: "center", color: "#677D6A" }}>
                !! Register Here !!
              </h1>
              <label
                htmlFor="name"
                className="form-label"
                style={{ color: "#ECF4D6", fontWeight: "bold" }}
              >
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                placeholder="Enter your name"
                onChange={onChange}
                style={{ backgroundColor: "#272829", color: "#FFF6E0" }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
                style={{ color: "#ECF4D6", fontWeight: "bold" }}
              >
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email Address"
                value={credentials.email}
                onChange={onChange}
                id="email"
                aria-describedby="emailHelp"
                style={{ backgroundColor: "#272829", color: "#FFF6E0" }}
              />
              <div
                id="emailHelp"
                className="form-text"
                style={{ color: "#ECF4D6", fontStyle: "italic" }}
              >
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: "#ECF4D6", fontWeight: "bold" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                placeholder="Create a password"
                onChange={onChange}
                id="password"
                style={{ backgroundColor: "#272829", color: "#FFF6E0" }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="location"
                className="form-label"
                style={{ color: "#ECF4D6", fontWeight: "bold" }}
              >
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="location"
                placeholder="Address"
                value={credentials.location}
                onChange={onChange}
                id="location"
                style={{ backgroundColor: "#272829", color: "#FFF6E0" }}
              />
            </div>

            {/* Flexbox to align buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                type="submit"
                className="btn"
                style={{
                  color: "#003C43",
                  backgroundColor: "#5C8374",
                  fontWeight: "bold",
                  width: "49%",
                }}
              >
                Create an Account
              </button>
              <Link
                to="/login"
                className="btn"
                style={{
                  color: "#FFE8C5",
                  backgroundColor: "#FF0000",
                  fontWeight: "bold",
                  width: "49%",
                  textAlign: "center",
                }}
              >
                Already a User? Log-In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
