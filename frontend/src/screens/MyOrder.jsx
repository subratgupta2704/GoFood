import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      try {
        // Use a dynamic base URL
        const baseURL =
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000"
            : "https://gofood-bt3j.onrender.com";

        const response = await fetch(`${baseURL}/api/auth/OrderData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrderData(data);
        } else {
          console.error("Failed to fetch order data");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData.map((data, index) => (
              <div key={index}>
                {data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((arrayData, itemIndex) => (
                        <div key={itemIndex}>
                          {arrayData.Order_date ? (
                            <div className="m-auto mt-5">
                              {arrayData.Order_date}
                              <hr />
                            </div>
                          ) : (
                            <div className="col-12 col-md-6 col-lg-3">
                              <div
                                className="card mt-3"
                                style={{ width: "16rem", maxHeight: "360px" }}
                              >
                                <img
                                  src={arrayData.img}
                                  className="card-img-top"
                                  alt="..."
                                  style={{
                                    height: "120px",
                                    objectFit: "fill",
                                  }}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {arrayData.name}
                                  </h5>
                                  <div
                                    className="container w-100 p-0"
                                    style={{ height: "38px" }}
                                  >
                                    <span className="m-1">{arrayData.qty}</span>
                                    <span className="m-1">
                                      {arrayData.size}
                                    </span>
                                    <div className="d-inline ms-2 h-100 w-20 fs-5">
                                      ₹{arrayData.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                  : ""}
              </div>
            ))
          ) : (
            <div>No order data available.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
