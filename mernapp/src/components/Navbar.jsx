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
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand fst-italic fs-2"
            to="/"
            style={{ color: "#F1F6F9", fontWeight: "bold" }}
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
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{ color: "#F1F6F9", fontWeight: "bold" }}
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
                    style={{ color: "#F1F6F9", fontWeight: "bold" }}
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
                  className="btn bg-white text-success mx-1"
                  style={{ color: "#F1F6F9", fontWeight: "bold" }}
                  to="/login "
                >
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  style={{ color: "#F1F6F9", fontWeight: "bold" }}
                  to="/createuser "
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-1"
                  style={{ color: "#F1F6F9", fontWeight: "bold" }}
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  Cart {"  "}
                  <Badge pill bg="danger">
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
                  className="btn bg-white text-success mx-1"
                  style={{ color: "#F1F6F9", fontWeight: "bold" }}
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
