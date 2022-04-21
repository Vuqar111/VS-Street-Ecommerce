import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

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
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.0 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
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
    <div className="w-[80%] m-[auto] mt-[50px]">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Çatdırılma</h2>
                <p>
                  <strong>Ad:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Ünvan: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Ödəniş</h2>
                <p>
                  <strong>Metod:</strong> Bank kartı ilə
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Sifariş olunan məhsullar</h2>
                <ul>
                  {cart.cartItems.map((item) => (
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
                        <div>{item.size}</div>
                        <div>{item.color}</div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Sifariş özəti</h2>
              </li>
              <li>
                <div className="placeorder">
                  <div>Məhsullar</div>
                  <div>{cart.itemsPrice.toFixed(2)} Azn</div>
                </div>
              </li>
              <li>
                <div className="placeorder">
                  <div>Çatdırılma</div>
                  <div>{cart.shippingPrice.toFixed(2)} Azn</div>
                </div>
              </li>
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
                  className="greenbtn block"
                  disabled={cart.cartItems.length === 0}
                >
                  ÖDƏ
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
