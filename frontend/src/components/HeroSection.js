import React from "react";
import tshirt from "../assets/t-shirtimg.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
const HeroSection = () => {
  return (
    <Wrapper>
      <div className="main">
        <div className="content">
          <h1 className="herotitle">
            <span className="clipspan">VS-Fashion</span>-da <br /> öz
            tərzini yarat
          </h1>
          <p>
            Dimension of reality that makes change possible and understandable.
            An indefinite and homogeneous environment in which natural events
            and human existence take place.
          </p>
          <Link to="/">
            <button type="button" className="bg-[#08AD76] text-[white] p-[1rem] homebtn">
              Bizi kəşf et
            </button>
          </Link>
        </div>
        <div className="boximg">
          <img src={image2} alt="img" />
        </div>
      </div>
    </Wrapper>
  );
};

export default HeroSection;

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  height: 70vh;
  .main {
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
  }

  .boximg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 450px;
    clip-path: polygon(0 18%, 100% 9%, 100% 91%, 0 82%);
    background: grey;
    border-radius: 15px;
  }

  .clipspan {
    padding: 10px;
    color: white;
    background: var(--green-color);
    clip-path: polygon(100% 28%, 100% 72%, 0 89%, 0 11%);
    border-radius: 10px;
    font-weight: bolder;
  }

  .content {
    margin-left: 30px;
    padding: 20px;
  }

  .content h1 {
    font-size: 35px;
  }

  .content p {
    font-size: 15px;
  }
  @media (max-width: 768px) {
    height: auto;
    .main {
      width: 100%;
      flex-direction: column-reverse;
    }

    .boximg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
      height: auto;
      clip-path: none;
      background: transparent;
      border-radius: 15px;
      margin-top: 15px;
    }
    .content {
      margin-left: 0px;
    }

    .content h1 {
      font-size: 30px;
    }
  }
`;
