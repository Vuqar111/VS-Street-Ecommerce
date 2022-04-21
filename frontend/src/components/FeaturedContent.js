import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";

const FeaturedContent = () => {
  return (
    <Wrapper>
      <div className="featuredtext">
        <h1>
          <span>Featured</span> Content
        </h1>
      </div>
      <div className="mainfeaturedsection">
        <div className="imgdiv">
          <img src={image1} alt="image1" />
        </div>
        <div className="infodiv">
          <div className="secondinfodiv">
            <h1>
              We are Experts <br /> in Building Dreams
            </h1>
            <p>
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in
            </p>
            <Link to="/cart">
              <button>Explore More</button>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;

  .mainfeaturedsection {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0px;
  }
  .featuredtext {
    font-weight: bold;
  }

  .featuredtext h1 {
    font-size: 35px;
    color: black;
    font-weight: bolder;
  }

  .featuredtext span {
    padding: 10px;
    color: white;
    background: var(--green-color);
    clip-path: polygon(100% 28%, 100% 72%, 0 89%, 0 11%);
    border-radius: 10px;
    font-weight: bolder;
  }

  .imgdiv {
    position: absolute;
    width: 45%;
    height: 800px;
    background: #f6f6f4;
    clip-path: polygon(0 18%, 100% 27%, 100% 73%, 0 82%);
    z-index: 1000;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .infodiv {
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(0 33%, 100% 12%, 100% 88%, 0 76%);
    flex-direction: column;
    height: 800px;
    text-align: center;
    background: #e7f6f3;
    border-radius: 30px;
  }
  .secondinfodiv {
    margin-left: 650px;
    width: 40%;
    float: right;
    text-align: left;
  }
  .infodiv h1 {
    font-weight: bold;
    text-align: left;
    font-size: 35px;
  }
  .infodiv button {
    background: var(--green-color);
    margin-top: 10px;
    padding: 10px;
    color: white;
    border-radius: 5px;
  }

  @media screen and (max-width: 768px) {
   display: none;
  }
`;
export default FeaturedContent;
