import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import cardimg from "../assets/master.png";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Kart");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div className='w-[80%] m-[auto] mt-[50px]'>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="formpayment" onSubmit={submitHandler}>
        <div>
          <h2 className="paymenttitle">Ödəniş metodunu təsdiqləyin</h2>
        </div>
        <div className="paymentdiv row wmax">
          <div>
            <input
              type="radio"
              id="card"
              value="card"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="card" className="methodtitle">
              Kart
            </label>
          </div>
          <div className="cardimgdiv">
            <img src={cardimg} alt="card" />
          </div>
        </div>
        <div>
          <button className="bg-[#08AD76] text-[white] p-[1rem]" type="submit">
            Davam Et
          </button>
        </div>
      </form>
    </div>
  );
}
