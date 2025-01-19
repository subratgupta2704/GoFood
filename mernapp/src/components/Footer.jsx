import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer
        className="d-flex justify-content-between align-items-center py-3 my-0"
        style={{ backgroundColor: "#77B0AA" }}
      >
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></Link>
          <span
            className="text"
            style={{
              color: "#16423C",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            All Rights Reserved
          </span>
        </div>

        <div className="d-flex justify-content-end " style={{ flex: 1 }}>
          <span
            className="text"
            style={{
              color: "#16423C",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            © 2023 GoFood, Inc.
          </span>
        </div>
      </footer>
    </div>
  );
}
