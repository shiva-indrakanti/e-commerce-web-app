import React from "react";

const CartItem = ({
  id,
  title,
  price,
  image,
  quantity,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  return (
    <div key={id} className="flex justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start " style={{ height: '200px' }}  >
      <img src={image} alt="product" className="w-40 h-25 object-cover rounded-lg" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-10 sm:mt-0 sm:block sm:space-x-4">
          <div className="flex items-center border-gray-100 mr-0">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-navy hover:text-white" onClick={onDecrease}> - </span>
            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={quantity} min="1" />
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-navy hover:text-white" onClick={onIncrease}> + </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-base">${price}</p>
            <button className="font-bold text-gold hover:text-red-500" onClick={() => onRemove(id)}>
             Remove
            </button>
          </div>
        </div>
      </div>
    </div>
);
};

export default CartItem;
