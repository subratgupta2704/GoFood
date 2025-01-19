import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#77B0AA", height: "60px" }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fst-italic fs-2"
            to="/"
            style={{ color: "#16423C", fontWeight: "bold" }}
          >
            Go Food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{
                    color: "#16423C",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    style={{
                      color: "#16423C",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Order
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn mx-1"
                  style={{
                    color: "#DEF5E5",
                    fontWeight: "bold",
                    backgroundColor: "#16423C",
                  }}
                  to="/login "
                >
                  Login
                </Link>
                <Link
                  className="btn mx-1"
                  style={{
                    color: "#DEF5E5",
                    fontWeight: "bold",
                    backgroundColor: "#16423C",
                  }}
                  to="/createuser "
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn mx-1"
                  style={{
                    color: "#DEF5E5",
                    fontWeight: "bold",
                    backgroundColor: "#16423C",
                  }}
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  Cart {"  "}
                  <Badge
                    pill
                    className="bg-danger"
                  >
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal
                    onClose={() => {
                      setCartView(false);
                    }}
                  ></Modal>
                ) : null}
                <div
                  className="btn mx-1"
                  style={{
                    color: "#DEF5E5",
                    fontWeight: "bold",
                    backgroundColor: "#16423C",
                  }}
                  onClick={handleLogout}
                >
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
