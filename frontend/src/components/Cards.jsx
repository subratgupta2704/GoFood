import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food.length > 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div
        className="card mt-3"
        style={{
          width: "17rem",
          maxHeight: "500px",
          backgroundColor: "#1B4242",
        }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ color: "#ECF4D6"}}>
            {props.foodItem.name}
          </h5>
          <div className="container w-100">
            <select
              className="m-1 h-100 rounded"
              style={{ color: "#003C43", backgroundColor: "#5C8374", fontWeight: "bold"}}
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {" "}
                    {i + 1}{" "}
                  </option>
                );
              })}
            </select>
            <select
              className="m-1 h-100 rounded"
              style={{ color: "#003C43", backgroundColor: "#5C8374", fontWeight: "bold"}}
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5" style={{color:"#ECF4D6", fontWeight:"normal"}}>  Rs.{finalPrice}/-</div>
          </div>
          <hr style={{ border: "1px solid #ECF4D6", margin: "10px 0" }} />
          <button
            className={"btn justify-centre"}
            style={{ color: "#003C43", backgroundColor: "#5C8374", fontWeight: "bold"}}
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
