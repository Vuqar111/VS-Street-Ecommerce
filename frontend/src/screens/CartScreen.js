import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { AiFillDelete, AiFillCloseCircle } from "react-icons/ai";


export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const size = props.location.search ? props.location.search.split("=")[3] : "L";
  const color = props.location.search ? props.location.search.split("=")[5] : "Qara";

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size, color));
    }
  }, [dispatch, productId, qty, size, color]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [phonenumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [region, setRegion] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);



  const submitHandler = (e) => {
    e.preventDefault();
 
    let moveOn = true;

    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          region,
          postalCode,
          country,
          
        })
      );
      props.history.push("/placeorder");
    }
  };



  const [openmenu, setOpenMenu] = useState(false);
  return (
    <div className="row rowcart start wnormal">
      <div className="col-2">
        <h2>Səbətiniz</h2>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Səbətiniz boşdur. <Link to="/search/name">Alış-verişə başla</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row wmax">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="">{size}</div>
                  <div className="">{color}</div>
                  <div>
                    <select
                      className="p-[0px]"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{item.price}Azn</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="ordersection">
        <div className="wmax p-[10px]">
          <ul>
            <li className="text-[25px]">Sifarişin özəti</li>
            <li className="flex  justify-between">
              <div>Məhsullar</div>
              <div>
                ({cartItems.reduce((a, c) => a + c.qty, 0)} məhsul) :
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} Azn
              </div>
            </li>
            <li className="flex  justify-between">
              <div>Endirim</div>
              <div>0 Azn</div>
            </li>
            <hr />
            <li className="flex  justify-between">
              <div>Ümumi Qiymət</div>
              <div>
                {cartItems.reduce((a, c) => a + c.qty, 0) > 5
                  ? cartItems.reduce((a, c) => a + c.price * c.qty, 0) + 10
                  : cartItems.reduce((a, c) => a + c.price * c.qty, 0)}{" "}
                Azn 
              </div>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setOpenMenu(true)}
                className="wmax bg-[#08AD76] text-[white] p-[1rem]"
                disabled={cartItems.length === 0}
              >
                Sifarişi tamamla
              </button>
              <h3 className="text-center">Və ya</h3>
              <Link to="/">
                <button
                  type="button"
                  className="wmax bg-[white] border-solid border-2 border-[black] p-[1rem]"
                  disabled={cartItems.length === 0}
                >
                  Alış-verişə davam et
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={openmenu ? "shippingadress open" : "shippingadress"}>
        <CheckoutSteps step1 step2></CheckoutSteps>

        <form className="formshipping" onSubmit={submitHandler}>
          <div className="text-center  text-[20px]">
            <h2 className="mt-[15px]">Çatdırılma Adresi</h2>
          </div>

          <div className="row wmax shippingdiv">
            <label htmlFor="fullName">Tam Ad</label>
            <input
              type="text"
              id="fullName"
              placeholder="Tam adınızı daxil edin"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>

          <div className="row wmax shippingdiv">
            <label htmlFor="phonenumber">Telefon nömrəsi</label>
            <input
              type="tel"
              id="phonenumber"
              placeholder="Telefon nömrənizi daxil edin"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            ></input>
          </div>

          <div className="row wmax shippingdiv">
            <label htmlFor="city">Şəhər</label>
            <input
              type="text"
              id="city"
              placeholder="Şəhəri daxil edin"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>

          <div className="row wmax shippingdiv">
            <label htmlFor="region">Rayon</label>
            <input
              type="text"
              id="region"
              placeholder="Rayonu seçin"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            ></input>
          </div>

          <div className="row wmax shippingdiv">
            <label htmlFor="postalCode">Postal Kod</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Postal kodu daxin edin"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>
          </div>

     

          <div className="row wmax shippingdiv">
            <label htmlFor="address" className="ml-[20px]">
              Tam Address
            </label>
            <textarea
              type="text"
              id="address"
              placeholder="Tam adresi  daxil edin"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="row wmax shippingdiv">
            <label />
            <button
              className="w-[100%] bg-[#08AD76] text-[white] p-[1rem] mb-[10px]"
              type="submit"
            >
              Davam Et
            </button>
          </div>
        </form>

        <div className="closeshipping" onClick={() => setOpenMenu(false)}>
          <AiFillCloseCircle />
        </div>
      </div>
    </div>
  );
}
