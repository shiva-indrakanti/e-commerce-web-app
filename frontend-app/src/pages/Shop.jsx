import React, { useEffect, useState } from "react";
import "./Shop.css";
import Cards from "./Cards";

const Shop = () => {
  const [products, updateProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const REST_URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch(REST_URL);
    const data = await response.json();
    console.log(data);
    updateProducts(data);
    setFilteredProducts(data);
  };

  useEffect(() => {
    if (selectedCategory === "All Products") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category) => {
    console.log(category);
    setSelectedCategory(category);
  };

  return (
    <div className="shop-div">
      <div className="main-container-filter">
        {/* buttons*/}
        <div className="filter-buttons">
          <button
            className={selectedCategory === "All Products" ? "active" : ""}
            onClick={() => handleCategoryChange("All Products")}
          >
            All Products
          </button>
          <button
            className={selectedCategory === "men's clothing" ? "active" : ""}
            onClick={() => handleCategoryChange("men's clothing")}
          >
            Clothing
          </button>
          <button
            className={selectedCategory === "jewelery" ? "active" : ""}
            onClick={() => handleCategoryChange("jewelery")}
          >
            Jewelery
          </button>
          <button
            className={selectedCategory === "electronics" ? "active" : ""}
            onClick={() => handleCategoryChange("electronics")}
          >
            Electronics
          </button>
          <button
            className={selectedCategory === "baby care" ? "active" : ""}
            onClick={() => handleCategoryChange("baby care")}
          >
            Baby Care
          </button>
        </div>

        {/* sorting*/}
        <div class="filter-container">
          <div class="icon-wrapper">
            <i class="fa fa-filter filter-icon"></i>
          </div>
          <select class="custom-select">
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      </div>
      <div className="product-container">
        <Cards filteredProducts={filteredProducts} />
      </div>
    </div>
  );
};

export default Shop;
