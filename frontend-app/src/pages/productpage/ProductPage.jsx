import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slice/cartslice";
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faCartShopping,
  faPlus,
  faMinus,
  faHeart,
  faStar,
  faStarHalfAlt,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [activeImg, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
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
    dispatch(addToCart({ product, quantity }));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyClick = ()=>{
    dispatch(addToCart({ product, quantity }));
    navigate('/cart');
  }

  const handleSaveClick = ()=>{
    navigate('/wishlist');
  }
  return (
    <>
    <div
      className="flex flex-col lg:flex-row justify-center gap-16 h-screen"
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
    >
      {/* Images Section starts*/}
      <div className="flex justify-center items-center w-full lg:w-1/2">
        <div className="flex flex-col justify-center items-center ml-12">
          <div className="p-2 border-2 border-gray-300 rounded-xl flex justify-center items-center ">
            <img
              src={activeImg}
              alt="Product"
              className="w-[60%] h-[60%] object-cover rounded-xl"
            />
          </div>

          <div className="mb-5"></div>
          <div className="flex justify-center gap-3">
            <div className="p-1 border-2 border-gray-300 rounded-md">
              <img
                src={product.image}
                alt="Product"
                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                onClick={() => setActiveImage(product.image)}
              />
            </div>
            <div className="p-1 border-2 border-gray-300 rounded-md">
              <img
                src={product.image}
                alt="Product"
                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                onClick={() => setActiveImage(product.image)}
              />
            </div>
            <div className="p-1 border-2 border-gray-300 rounded-md">
              <img
                src={product.image}
                alt="Product"
                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                onClick={() => setActiveImage(product.image)}
              />
            </div>
            <div className="p-1 border-2 border-gray-300 rounded-md">
              <img
                src={product.image}
                alt="Product"
                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                onClick={() => setActiveImage(product.image)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Images Section ends*/}

      {/* About Section  starts*/}
      <main className="flex justify-center items-center w-full lg:w-1/2">
        <div className="lg:pl-3">
          <h4 className="text-lg font-bold text-gray-800 text-left text-3xl">
            {product.title}
          </h4>
           {/* Star Rating Icons starts here */}
          <div className="flex flex-row my-3">
            <div className="text-yellow-400 mb-1 mr-2">
              <FontAwesomeIcon icon={faStar} className="text-green-500" />
              <FontAwesomeIcon icon={faStar} className="text-green-500" />
              <FontAwesomeIcon icon={faStar} className="text-green-500" />
              <FontAwesomeIcon icon={faStar} className="text-green-500" />
              <FontAwesomeIcon
                icon={faStarHalfAlt}
                className="text-green-500"
              />
              <span className="ml-1 text-gray-800">4.5</span>
            </div>
            <span className="text-gray-500">
              <FontAwesomeIcon icon={faBasketShopping} className="mr-2" />
              154 orders
            </span>
            <span className="text-green-600 ml-2">In stock</span>
          </div>
           {/* Star Rating Icons ends here */}

          {/* Price starts here */}
          <div className="mb-3 text-left pb-2">
            <span className="text-2xl text-navy">${product.price}</span>
            <span className="text-gray-500 ">/per box</span>
          </div>
           {/* price ends here */}

          {/* Product description starts */ }
          <div className="text-left">
            <h6 className="text-gray-800 font-semibold mb-2 text-navy">Product Info</h6>
            <p
              className="text-gray-700 pb-6"
              style={{ paddingRight: "100px", width: "80%" }}
            >
              {product.description}
            </p>
          </div>
          {/* Product description ends */ }

          {/* Product info starts */ }
          <div className="text-left">
            <div className="mb-2">
              <dt
                className="text-navy"
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginRight: "57px",
                }}
              >
                Type:
              </dt>
              <dd style={{ display: "inline-block" }}>Regular</dd>
            </div>
            <div className="mb-2">
              <dt
                className="text-navy"
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginRight: "54px",
                }}
              >
                Color:
              </dt>
              <dd style={{ display: "inline-block" }}>Brown</dd>
            </div>
            <div className="mb-2">
              <dt
                className="text-navy"
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginRight: "30px",
                }}
              >
                Material:
              </dt>
              <dd style={{ display: "inline-block" }}>{product.category}</dd>
            </div>
            <div className="mb-2">
              <dt
                className="text-navy"
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginRight: "50px",
                }}
              >
                Brand:
              </dt>
              <dd style={{ display: "inline-block" }}>Reebok</dd>
            </div>
          </div>
          {/* Product info ends */ }

          <hr className="my-4" style={{ width: "80%" }} />

          {/* size and quantity area*/}
          <div className="flex space-x-8 mb-4 text-left">
            <div>
              <label className="mb-2 block ">Size</label>
              <select className="border border-gray-400 h-8 w-32 rounded px-1">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block">Quantity</label>
              <div className="flex border border-gray-400 rounded w-44">
                <button
                  className="px-3 border-r border-gray-300 pr-4"
                  onClick={decreaseQuantity}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="text"
                  className="text-center w-[50%] focus:outline-none"
                  value={quantity}
                />
                <button
                  className="px-3 border-l border-gray-300"
                  onClick={increaseQuantity}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          {/* size and quantity ends*/}

          {/* Buy and add to cart area starts*/}
          <div className="flex space-x-3 pt-7">
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded shadow cursor-pointer transform transition-transform duration-200 hover:scale-105"
              style={{ fontSize: "13px" }}
              onClick={handleBuyClick}
            >
              Buy now
            </button>

            <button
              className="bg-black text-white py-2 px-4 rounded shadow flex items-center cursor-pointer transform transition-transform duration-200 hover:scale-105"
              onClick={handleAddToCart}
              style={{ fontSize: "13px" }}
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              Add to cart
            </button>

            <button
              className="bg-gray-200 border border-gray-400 text-gray-600 py-2 px-4 rounded flex items-center cursor-pointer transform transition-transform duration-200 hover:scale-105 text-navy"
              style={{ fontSize: "13px" }}
              onClick={handleSaveClick}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-1" /> Save
            </button>
          </div>
          {/* Buy and add to cart area ends*/}
        </div>
      </main>
      {/* About Section  ends*/}
    </div>
    <div className="flex justify-center space-x-8 my-8">
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-black transition-colors duration-200">
        <FontAwesomeIcon icon={faInstagram} className="mr-2" />
        Instagram
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-black transition-colors duration-200">
        <FontAwesomeIcon icon={faTwitter} className="mr-2" />
        Twitter
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-black transition-colors duration-200">
        <FontAwesomeIcon icon={faFacebook} className="mr-2" />
        Facebook
      </a>
      <a href="/help" className="flex items-center text-gray-600 hover:text-black transition-colors duration-200">
        <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
        Help
      </a>
    </div>
    </>
  );
};

export default ProductPage;
