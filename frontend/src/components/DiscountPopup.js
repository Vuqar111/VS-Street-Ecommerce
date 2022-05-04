import React,{useState} from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
const DiscountPopup = () => {


  const [closePopup, setClosePopup] = useState(false);
  return (
    <Wrapper>
      <div className={closePopup ? 'discountmodal active' : 'discountmodal'}>
        <div>
          <h2>VS-Fashionda Endirim var</h2>
          <p>
            lorem lorem loem lorem lorem lroeom lroem lroem lorem lorem lorem
            lorme lorem lorem lorem loem{" "}
          </p>
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/5868272/pexels-photo-5868272.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="image"
          />
        </div>

        <button type="button" className="closebtn"  onClick={() => {
                setClosePopup(!closePopup);
              }}>
          <AiOutlineClose />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .discountmodal {
      display: none;
    width: 40%;
    margin: auto;
    height: 400px;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 10px;
    z-index: 5000;
    background: white;
  }
  .closebtn {
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 20px;
    color: green;
  }
  @media (max-width: 768px) {
      .discountmodal {
          width: 90%;
          display: none;
          height: 270px;
          flex-direction: column;
      }
      p {
          display: none;
      }
  }
`;
export default DiscountPopup;
