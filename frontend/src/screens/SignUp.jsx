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
    const response = await fetch("http://localhost:5000/api/createuser", {
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
      alert("Enter Valid Credentials");
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
                {" "}
                !! Register Here !!
              </h1>
              <label
                htmlFor="exampleInputEmail1"
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
                htmlFor="exampleInputEmail1"
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
                id="exampleInputEmail1"
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
                value={credentials.password}
                placeholder="Create a password"
                onChange={onChange}
                id="exampleInputPassword1"
                style={{ backgroundColor: "#272829", color: "#FFF6E0" }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
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
                id="exampleInputPassword1"
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
