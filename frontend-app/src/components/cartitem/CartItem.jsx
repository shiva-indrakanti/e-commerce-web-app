import React from "react";
import './CartItem.css';

const CartItem = ({
  id,
  title,
  price,
  image,
  quantity,
  totalPrice,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="cart-item-container">
      <div className="cart-item-info">
        <img src={image} alt={title} className="cart-item-image" />
        <div className="cart-item-details">
          <h2 className="cart-item-title">{title}</h2>
          <div className="cart-item-quantity">
            <button onClick={() => onDecrease(id)} className="quantity-button">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => onIncrease(id)} className="quantity-button">
              +
            </button>
          </div>
          <p className="cart-item-price">Price: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Remove Button */}
      <div className="cart-item-remove">
        <button onClick={() => onRemove(id)} className="remove-button">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
