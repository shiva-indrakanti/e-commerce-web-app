import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slice/cartslice";
import "./ProductPage.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [activeImg , setActiveImage ]= useState("");
  const [quantity,setQuantity] = useState(1);

  useEffect(() => {
    const REST_URL = `https://fakestoreapi.com/products/${productId}`;
    const fetchProduct = async () => {
      try {
        const response = await fetch(REST_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        setActiveImage(data.image);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProduct();
  }, [productId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const increaseQuantity = ()=>{
    setQuantity(quantity+1);
  }

  const decreaseQuantity = ()=>{
    if(quantity < 1){
      setQuantity(quantity-1);
    }
    
  }
  return (
   <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
    <div  className="flex flex-col gap-6 lg:w-2/4">
      <img src={activeImg} alt="" className='w-full h-full aspect-square object cover rounded-xl' />
      <div className="flex flex-row justify-between h-34">
        <img src={product.image} alt="" className="w-24 h-24 rounnded-m cursor-pointer" onClick={() => setActiveImage(product.image)} />
        <img src={product.image} alt="" className="w-24 h-24 rounnded-md cursor-pointer" onClick={() => setActiveImage(product.image)} />
        <img src={product.image} alt="" className="w-24 h-24 rounnded-md cursor-pointer" onClick={() => setActiveImage(product.image)} />
        <img src={product.image} alt="" className="w-24 h-24 rounnded-md cursor-pointer" onClick={() => setActiveImage(product.image)} />
      </div>
    </div>

    {/* about */ }
     <div className="flex flex-col gap-4 lg:w-2/4">
      <div >
        <span className="text-violet-600 font-semibold ">{product.category}</span>
        <h1 className="text-3xl fonr-bold p-5">{product.title}</h1>
      </div>
      <p className="text-gray-700">{product.description}</p>
      <h6 className="text-2xl font-semibold">Price : ${product.price}</h6>
      <div className="flex flex-row items-center gap-12">
        <div className="flex flex-row item-center">
          <button className="bg-gray-200 py-2 px-5 rounder-lg text-gray-800 text-3xl" onClick={decreaseQuantity}>-</button>
          <span className="py-4 px-6 rounded-lg">{quantity}</span>
          <button className="bg-gray-200 py-2 px-4 rounded-lg text-#E7C967-800 text-3xl" onClick={increaseQuantity}>+</button>
        </div>
        <button className=" text-white font-semibold py-3 px-16 rounded-xl h-full" style={{ backgroundColor: '#E7C967' }} onClick={handleAddToCart}>Add to Cart</button>
      </div>
     </div>
   </div>
  );
};

export default ProductPage;
