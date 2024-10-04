import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../slice/cartslice";
import CartItem from "../components/cartitem/CartItem";
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

  // Calculate subtotal
  const subtotal = aggregatedItems.reduce((acc, item) => acc + item.totalPrice, 0);

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
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      {aggregatedItems.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-bold mb-4">No Cart Items</h2>
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <p className="text-gray-600">Go shop and add products to your cart!</p>
            <button className="mt-4 w-full rounded-md py-1.5 font-medium text-white bg-[#E7C967] hover:bg-black transition-colors duration-300">
              Shop Now
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {aggregatedItems.map((currentProduct) => (
              <CartItem
                key={currentProduct.id}
                {...currentProduct}
                onIncrease={() => handleIncreaseQuantity(currentProduct.id)}
                onDecrease={() => handleDecreaseQuantity(currentProduct.id)}
                onRemove={() => handleRemoveItem(currentProduct.id)}
              />
            ))}
          </div>

          {/* Subtotal Section */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{(subtotal + 4.99).toFixed(2)}</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md py-1.5 font-medium text-white bg-[#E7C967] hover:bg-black transition-colors duration-300">
              Check out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
