import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slice/cartslice";
import "./ProductPage.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const [activeImg , setActiveImage ]= useState("");

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

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
   <div className='flex flex-col justify-between lg:flex-row'>
    <div  className="flex flex-col gap-6 mt-10 ml-20">
      <img src={activeImg} alt="" className='w-full h-full aspect-square object cover rounded-xl' />
      <div className="flex flex-row justify-between h-34">
        <img src={product.image} alt="" className="w-24 h-24 rounnded-m cursor-pointer" onClick={() => setActiveImage(product.image)} />
        <img src={product.image} alt="" className="w-24 h-24 rounnded-md cursor-pointer" onClick={() => setActiveImage(product.image)} />
        <img src={product.image} alt="" className="w-24 h-24 rounnded-md cursor-pointer" onClick={() => setActiveImage(product.image)} />
        <img src={product.image} alt="" className="w-24 h-24 rounnded-md cursor-pointer" onClick={() => setActiveImage(product.image)} />
      </div>
    </div>
   </div>
  );
};

export default ProductPage;
