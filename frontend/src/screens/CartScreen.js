import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Select from "react-select";
import { Link } from "react-router-dom";
import data from '../data.json';
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { AiFillDelete } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";


export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const size = props.location.search ? props.location.search.split("=")[3] : 1;
  const color = props.location.search ? props.location.search.split("=")[5] : 1;

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
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [phonenumber,setPhoneNumber] = useState(shippingAddress.phoneNumber);
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


console.log(cartItems.reduce((a, c) => a + c.qty, 0));

  

  // generate the link when both dropdowns are selected
  // useEffect(() => {
  //   if (country && lang) {
  //     setLink(`https://www.${country.url}/search?q=Clue+Mediator&gl=${country.country_code}&hl=${lang.code}`);
  //   }
  // }, [country, lang]);


  const [openmenu, setOpenMenu] = useState(false);
  return (
    <div className="rowcart">
      <div className="col-2">
        <h1 className="font-bold">Səbətiniz</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Səbətiniz boşdur. <Link to="/">Alış-verişə başla</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="rowcarting">
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
        <div className="w-[100%] p-[10px]">
          <ul>
            <li className="font-bold text-[25px]">Sifarişin özəti</li>
            <li className="flex  justify-between">
              <div className="font-bold">Məhsullar</div>
              <div>
                ({cartItems.reduce((a, c) => a + c.qty, 0)} məhsul) : 
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} Azn
              </div>
            </li>
            <li className="flex  justify-between">
              <div className="font-bold">Endirim</div>
              <div>0 Azn</div>
            </li>
            <hr />
            <li className="flex  justify-between">
              <div className="font-bold">Ümumi Qiymət</div>
              <div>
                {cartItems.reduce((a, c) => a + c.qty, 0) > 5 ? cartItems.reduce((a, c) => a + c.price * c.qty, 0) + 10 : cartItems.reduce((a, c) => a + c.price * c.qty, 0)} Azn
                 Azn</div>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setOpenMenu(true)}
                className=" w-[100%] bg-[#08AD76] text-[white] "
                disabled={cartItems.length === 0}
              >
                Sifarişi tamamla
              </button>
              <h3 className="text-center">Və ya</h3>
              <Link to="/">
                <button
                  type="button"
                  className="w-[100%] bg-[white] border-solid border-2 border-[black]"
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
          <div className="text-center font-bold text-[20px]">
            <h1 className="mt-[15px]">Shipping Address</h1>
          </div>

     

          <div className="shippingdiv">
            <label htmlFor="fullName">Ad Soyad</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>

          <div className="shippingdiv">
            <label htmlFor="phonenumber">Telefon nömrəsi</label>
            <input
              type="tel"
              id="phonenumber"
              placeholder="Enter Phone Number"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            ></input>
          </div>  

          <div className="shippingdiv">
              <label htmlFor="city">Şəhər</label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              ></input>
            </div>


            <div className="shippingdiv">
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

            <div className="shippingdiv">
              <label htmlFor="postalCode">Postal Kod</label>
              <input
                type="text"
                id="postalCode"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              ></input>
            </div>
       

           <div className="shippingdiv">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </div> 


          

          <div className="shippingdiv">
            <label htmlFor="address" className="ml-[20px]">Tam Address</label>
            <textarea
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="shippingdiv">
            <label />
            <button className="w-[100%] greenbtn" type="submit">
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
