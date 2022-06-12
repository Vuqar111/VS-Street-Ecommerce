import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
export default function Product(props) {
  const { product } = props;
  return (
    <>
      <Link to="/search/name">
        <div key={product._id} className="box">
          <div className="boximg row">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="footer">
            <h3>{product.name}</h3>
            <p>{product.price} Azn</p>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </div>
        </div>
      </Link>
    </>
  );
}
