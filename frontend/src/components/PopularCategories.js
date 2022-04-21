import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const PopularCategories = () => {
  return (
    <Wrapper>
      <div className="featuredtext">
        <h1>
          <span className="clipspan">Məşhur </span> Kateqoriyalar
        </h1>
      </div>
      <div className="mainpopularsection">
        <div className="smalldiv m-[10px]"> 
          <img src={image2} alt="image" />
          <p className="subimglink">Explore More</p>
        </div>
        <div className="smalldiv m-[10px]">
          <img src={image2} alt="image" />
          <p className="subimglink">Explore More</p>
        </div>
        <div className="smalldiv m-[10px]">
          <img src={image2} alt="image" />
          <p className="subimglink">Explore More</p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;

  .mainpopularsection {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }
  .imagediv {
    display: flex;
    width: 50%;
  }

  .imagediv2 {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .smalldiv {
    position: relative;
    width: 300px;
    height: 100%;
    max-height: 600px;
  }
  .subimglink {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -10%);
    padding: 10px;
    border-radius: 10px;
    background: var(--green-color);
    color: white;
  }
  .enidiv {
    position: relative;
    width: 100%;
    height: 250px;
  }
  .bigdiv {
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .featuredtext {
    font-weight: bold;
  }

  .featuredtext h1 {
    font-size: 35px;
    color: black;
    font-weight: bolder;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export default PopularCategories;
