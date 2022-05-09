import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import styled from "styled-components";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  let componentRef = useRef();
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get(
        "https://mernbeginnersproject.herokuapp.com/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(order, paymentResult));
  // };
  // const deliverHandler = () => {
  //   dispatch(deliverOrder(order._id));
  // };

  const infoorder = () => {
    alert("Əziz müştəri, zəhmət olmasa sifariş haqqında məlumatı oxuyun");
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Wrapper>
      <div className="allorder">
        <div
          ref={(el) => (componentRef = el)}
          className="w-[100%] m-[auto]  mt-[30px]  rounded-[15px] p-[20px] border-[30px] orderprintscreen"
        >
          <h1 className="text-center text-[20px]">Sifariş: {order._id}</h1>
          <div className="w-[80%] m-[auto] p-[30px] flex justify-between items-center orderenterscreen">
            <div className="w-[100%]">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>
                      <strong>Çatdırılma Adresi</strong>
                    </h2>
                    <p>
                      {order.shippingAddress.fullName},
                      {order.shippingAddress.address},
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode},
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <div>{order.deliveredAt}-da çatdırıldı</div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>
                      <strong>Ödəniş:</strong>
                    </h2>
                    <p>
                      {/* {order.paymentMethod} */}
                      Bank Kartı ilə
                    </p>
                    {order.isPaid ? (
                      <div variant="success">
                        {order.paidAt}- tarixində ödənildi
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Sifariş olunan məhsullar</h2>
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item.product}>
                          <div className="placeorder">
                            <div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div>
                            <div className="min-30">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>

                            <div>
                              <Link to={`/product/${item.product}`}>
                                {item.size}
                              </Link>
                            </div>
                            <div>
                              <Link to={`/product/${item.product}`}>
                                {item.color}
                              </Link>
                            </div>

                            <div>
                              {item.qty} x {item.price} azn ={" "}
                              {item.qty * item.price} azn
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                {/* {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
                        <button className="w-[100%] greenbtn p-[1rem]" onClick={infoorder}>
                          ÖDƏNİŞİ EDİN {order.totalPrice.toFixed(2)} Azn
                        </button>
                      </> 
                    )}
                  </li>
                )} */}
                {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    {errorDeliver && (
                      <MessageBox variant="danger">{errorDeliver}</MessageBox>
                    )}
                    <button
                      type="button"
                      className="bg-[#08AD76] text-[white] p-[1rem] block"
                      onClick={infoorder}
                    >
                      Catdirilmani tamamla
                    </button>
                  </li>
                )} */}
              </ul>
            </div>
            <ReactToPrint
              trigger={() => (
                <button className="printbtn">
                  <AiFillPrinter />
                </button>
              )}
              content={() => componentRef}
            />
          </div>
        </div>
        <div className="orderinfodetail">
          <h1>SİFARİŞ HAQQINDA MƏLUMAT</h1>
          <p >
            Hörmətli müştəri, Sifarişiniz bitdiyi təqdirdə ödənişi etdikdən
            sonra zəhmət olmasa çekin şəklini chat (online chat, whatsapp və ya
            instagram) vasitəsilə bizə göndərin. Bizi seçdiyiniz üçün təşəkkür
            edirik!

            <br />
            <br />

            <div className="orderinfofooter">
              <div >
                <Link><FaInstagram/></Link>
              </div>
              <div>
                <Link><FaWhatsapp/></Link>
              </div>
             
            </div>

            
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .allorder {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }
  .orderinfodetail {
    width: 60%;
    padding: 20px;
    margin-top: 20px;
  }
  .orderinfodetail h1 {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  .orderinfodetail p {
    margin-top: 30px;
    font-weight: bold;
  }
  .printbtn {
    position: absolute;
    top: 22%;
    right: 43%;
    background: #08ad76;
    color: white;
    padding: 10px;
  }


  .orderinfofooter {
    width: 20%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 30px;
    color: #08AD76;
  }
  @media (max-width: 768px) {
    .orderprintscreen {
      width: 90%;
    }
    .orderprintscreen h1 {
      font-size: 20px;
      margin-top: 25px;
    }
    .orderenterscreen {
      width: 95%;
      padding: 10px;
    }

    .printbtn {
      top: 17%;
      right: 13%;
    }
  }
`;
