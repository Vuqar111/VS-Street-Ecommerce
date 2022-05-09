import React from "react";
import styled from "styled-components";
import tshirtvsfashion from '../assets/tshirtvsfashion.jpg';
import tshirt2vsfashion from '../assets/tshirt2vsfashion.jpeg';
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
          <img src={tshirtvsfashion} alt="image" />
          <h3 className="subimglinkh3">Tshirt Kolleksiyası</h3>
          <p className="subimglink">Kəşf Et</p>
        </div>
        <div className="smalldiv m-[10px]">
          <img src="https://images.pexels.com/photos/10506075/pexels-photo-10506075.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="image" />
          <h3 className="subimglinkh3">Hoodie Kolleksiyası</h3>
          <p className="subimglink">Kəşf Et</p>
        </div>
        <div className="smalldiv m-[10px]">
          <img src={tshirt2vsfashion} alt="image" />
          <h3 className="subimglinkh3">VsStreet Kolleksiyası</h3>
          <p className="subimglink">Kəşf Et</p>
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
    height: 400px;
    max-height: 600px;
  }
  .subimglinkh3 {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -10%);
    padding: 10px;
    border-radius: 10px;
    color: white;
    font-size: 30px;
    font-weight: bolder;
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
    width: 95%;
  margin: auto;
  text-align: center;

  .mainpopularsection {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
   
  }
`;
export default PopularCategories;
