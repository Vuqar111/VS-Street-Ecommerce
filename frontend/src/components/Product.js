import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import styled from "styled-components";
export default function Product(props) {
  const { product } = props;
  return (
    <Wrapper>
      <div key={product._id} className="box">
        <Link to={`/product/${product._id}`}>
        <div className="boximg">
          <img src={product.image} alt={product.title} />
        </div>
        </Link>      
        <div className="footer">
          <h3>{product.name}</h3>
          <p className="font-bold">{product.price} Azn</p>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: auto;
  
  .box {
    min-width: 300px;
    height: 100%;
    width: 100%;
    margin-top: 10px;
  }
  .boximg {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--white-color);
    max-width: 300px;
    width: 100%;
    height: 350px;
    transition: all 0.5s ease-in-out;
  }
  .boximg img {
    width: 100%;
    height: 100%;
    max-height: 350px;
    object-fit: cover;
  }

  .boximg:hover {
    transform: scale(1.1);
    transition: all 0.5s ease-in-out;
  }
  .footer {
    margin-top: 5px;
    h3 {
      font-size: 15px;
      font-weight: bold;
    }
  }


  @media (max-width: 768px) {
   
   
    width: auto;
  
  .box {
    min-width: 260px;
    height: 100%;
    width: 100%;
    margin-top: 10px;
  }
  .boximg {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--white-color);
    max-width: 300px;
    width: 100%;
    height: 350px;
  }
  .boximg img {
    width: 100%;
    height: 100%;
    max-height: 350px;
    object-fit: cover;
  }
  .footer {
    margin-top: 5px;
    h3 {
      font-size: 15px;
      font-weight: bold;
    }
  }
    
  }
`;
