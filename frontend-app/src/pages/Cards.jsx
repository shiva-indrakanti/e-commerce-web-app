import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

const Cards = ({ filteredProducts }) => {
  return (
    <div className="cards-container">
      {filteredProducts.map((item) => (
        <div className="card" key={item.id}>
          <Link to={`/shop/${item.id}`}>
            <img className="image" src={item.image} alt="" />
            <div className="product-info">
              <h4>{item.title}</h4>
              <div className="product-info-two">
                <p style={{ color: "gold" }}>{item.category}</p>
                <p style={{ fontWeight: 600, color: "skyblue" }}>
                  ${item.price}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
