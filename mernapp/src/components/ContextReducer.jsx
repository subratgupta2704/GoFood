import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      const newArr = state.filter((_, index) => index !== action.index); // Better index check
      return newArr;

    case "UPDATE":
      const updatedArr = state.map((food) =>
        food.id === action.id
          ? { ...food, qty: food.qty + action.qty, price: food.price + action.price }
          : food
      );
      return updatedArr;

    case "DROP":
      return []; // Empty the cart

    default:
      console.error("Unhandled action type:", action.type); // Better error handling
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
