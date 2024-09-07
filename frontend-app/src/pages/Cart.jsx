import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/cartitem/CartItem";
import "./Cart.css";

const aggregateCartItems = (cartItems) => {
  const itemDetails = {};

  cartItems.forEach((item) => {
    if (itemDetails[item.id]) {
      itemDetails[item.id].quantity += 1;
      itemDetails[item.id].totalPrice += item.price;
    } else {
      itemDetails[item.id] = {
        ...item,
        quantity: 1,
        totalPrice: item.price,
      };
    }
  });

  return Object.values(itemDetails);
};

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const aggregatedItems = aggregateCartItems(cartItems);

  const dispatch = useDispatch();

  // Function to increase quantity
  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    dispatch({ type: "cart/addToCart", payload: item });
  };

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item.quantity > 1) {
      dispatch({ type: "cart/removeOneFromCart", payload: item });
    } else {
      removeItem(id);
    }
  };

  // Function to remove item
  const removeItem = (id) => {
    dispatch({ type: "cart/removeFromCart", payload: { id } });
  };

  return (
    <>
      <div className="container">
        <hr />
        <div className="cart-item">
          {aggregatedItems.length === 0 ? (
            <p className="cart-empty-message">Your cart is empty</p>
          ) : (
            aggregatedItems.map((currentItem) => {
              return (
                <CartItem
                  key={currentItem.id}
                  {...currentItem}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
