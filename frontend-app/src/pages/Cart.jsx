import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/cartitem/CartItem";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../slice/cartslice";
import "./Cart.css";

const aggregateCartItems = (cartItems) => {
  const itemDetails = {};

  cartItems.forEach((item) => {
    if (itemDetails[item.id]) {
      itemDetails[item.id].quantity += item.quantity;
      itemDetails[item.id].totalPrice += item.price * item.quantity;
    } else {
      itemDetails[item.id] = {
        ...item,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
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
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  // Function to decrease quantity
  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  // Function to remove item
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <>
      <div className="container">
        <hr />
        <div className="cart-item">
          {aggregatedItems.length === 0 ? (
            <p className="cart-empty-message">Your cart is empty</p>
          ) : (
            aggregatedItems.map((currentItem) => (
              <CartItem
                key={currentItem.id}
                {...currentItem}
                onIncrease={() => handleIncreaseQuantity(currentItem.id)}
                onDecrease={() => handleDecreaseQuantity(currentItem.id)}
                onRemove={() => handleRemoveItem(currentItem.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
