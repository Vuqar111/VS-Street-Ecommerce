import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { createOrder } from "../common/actions/orderActions";
import { ORDER_CREATE_RESET } from "../common/constants/orderConstants";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import masterpng from "../common/assets/images/paymentpageicon.png";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

 

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = 0;
  cart.taxPrice = 0;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


 

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
 
  


  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);





  return (
    <Wrapper>
<div className="w-[80%] m-[auto] mt-[50px]">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row start">
        <div className="col-2">
          <ul className="row wmax ulplace">
            <li>
              <div className="card card-body">
                <h2 >
                  <strong>Çatdırılma Adresi</strong>
                </h2>
                <p>
                  {cart.shippingAddress.fullName}, <br />
                  {cart.shippingAddress.address}, <br />
                  {cart.shippingAddress.city}, <br />
                  {cart.shippingAddress.postalCode}, <br />
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>
                  <strong>Ödəniş</strong>
                </h2>
                <img
                  src={masterpng}
                  className="w-[200px] h-[40px]"
                  alt="masterimg"
                />
              
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1 placeordercheckout">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Sifariş özəti</h2>
              </li>
              <li className="text-[red]">
                ****
                Metrolara çatdırılma pulsuzdur. <br />
                Poçt-lara və ünvanlara kargo ilə çatdırılma məkandan asılı olaraq minimum 5 azn-dən başlayır
              </li>
              <li>
                <div className="placeorder">
                  <div>Məhsullar</div>
                  <div>{cart.itemsPrice.toFixed(2)} Azn</div>
                </div>
              </li>
              {/* <li>
                <div className="placeorder">
                  <div>Çatdırılma</div>
                  <div>{cart.shippingPrice.toFixed(2)} Azn</div>
                </div>
              </li> */}
              <li>
                <div className="placeorder">
                  <div>Endirim</div>
                  <div>{cart.taxPrice.toFixed(2)} Azn</div>
                </div>
              </li>
              <li>
                <div className="placeorder">
                  <div>
                    <strong>Ümumi qiymət</strong>
                  </div>
                  <div>
                    <strong>{cart.totalPrice.toFixed(2)} Azn</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="w-[100%] bg-[#08AD76] text-[white] p-[1rem]"
                  disabled={cart.cartItems.length === 0}
                >
                  ÖDƏNİŞ EDİN
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
      <hr className="mt-[20px]" />
      <div className="orderproducts wmin">
        <li>
          <div className="card card-body">
            <h2>Sifariş olunan məhsullar</h2>
            <ul className="mt-[15px]">
              {cart.cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                      ></img>
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>{item.size}</div>
                    <div>{item.color}</div>
                    <div>
                      {item.qty} x azn {item.price} = {item.qty * item.price}{" "}
                      azn
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>
      {/* <li>
        <div>
          <form onSubmit={submithandler}>
          <input  type="text" placeOrder="Kupon daxil edin" onChange={(e) => setChosenCoupon(e.target.value)}/>
          <button type="submit">Check Promo</button>
          </form>
          
        </div>
      </li> */}
      </div>
    </div>
    </Wrapper>
  );
}


const Wrapper = styled.div`


.placeordercheckout {
  padding: 30px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

@media (max-width: 768px) {
  .ulplace {
  width: 100%;
  flex-direction: column;
}

.ulplace h2 {
  font-size: 15px;
}
.placeordercheckout {
  padding: 5px;
  width: 100%;
  margin-top: 15px;
  box-shadow: none;
} 
.orderproducts {
  width: 100%;
}
}


`