import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
export default function Product(props) {
  const { product } = props;
  return (
   
      <div key={product._id} className="boxmain">
        <Link to={`/product/${product._id}`}>
          <div className="boximg row">
            <img src={product.image} alt={product.title} />
          </div>
        </Link>
        <div className="footer">
          <h3>{product.name}</h3>
          <p>{product.price} Azn</p>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
        </div>
      </div>
  
  );
}
