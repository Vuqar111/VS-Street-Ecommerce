import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchBox from "./components/SearchBox";
import SubSearch from "./components/SubSearch";
import SearchScreen from "./screens/SearchScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SupportScreen from "./screens/SupportScreen";
import Footer from "./components/Footer";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from 'react-icons/bs';
import {RiAdminLine} from 'react-icons/ri';
function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const [openMobile, setOpenMobile] = useState(false);
  const [searchmenu, setSearchmenu] = useState(false);
  return (
    <BrowserRouter>
      <div className="w-[100%] ">
        <header className="rownavbar">
          <div className="row">
            <div>
              <Link className="brand" to="/">
                VS-<span className="greenlink">Fashion</span>
              </Link>
            </div>
            <div>
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
            </div>
            <div className="desktopmenu">
            
                <Link to="/cart">
                <div className="flex justify-center items-center flex-col	">
                  <div className="text-[25px]">
                    <AiOutlineShoppingCart />
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </div>
                  <div>Cart</div>
                  </div>
                </Link>
              
              <div>
                {userInfo ? (
                  <div className="dropdown">
                    <Link to="#">
                      <div className="flex justify-center items-center flex-col	">
                        <div className="text-[25px]">
                          <BsFillPersonFill />
                        </div>
                        <div>Salam,{userInfo.name}</div>
                      </div>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/profile">Profil</Link>
                      </li>
                      <li>
                        <Link to="/orderhistory">Sifarişlər</Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>
                          Çıxış et
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/signin">
                     <div className="flex justify-center items-center flex-col	">
                        <div className="text-[25px]">
                          <BsFillPersonFill />
                        </div>
                        <div>Daxil Ol</div>
                      </div>
                  </Link>
                )}
              </div>
              <div>
                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">
                      <div className="flex justify-center items-center flex-col	">
                        <div className="text-[25px]">
                          <RiAdminLine />
                        </div>
                        <div>Welcome Admin</div>
                      </div>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/dashboard">Statistika</Link>
                      </li>
                      <li>
                        <Link to="/productlist">Məhsullar</Link>
                      </li>
                      <li>
                        <Link to="/orderlist">Sifarişlər</Link>
                      </li>
                      <li>
                        <Link to="/userlist">İstifadəçilər</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/*   MobileMenu */}

            <div
              className={openMobile ? "mainmobilemenu open" : "mainmobilemenu"}
            >
              <div className="mobilemenu">
                <div className="mobileresponsive">
                  <div>
                    <Link className="brand" to="/">
                      VS-Fashion
                    </Link>
                  </div>
                  <div
                    className="mobilecross"
                    onClick={() => {
                      setOpenMobile(false);
                    }}
                  >
                    <AiOutlineClose />
                  </div>
                </div>
                <div className="pl-[10px] pt-[15px]">
                  <Link to="/cart">
                    Kart
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link>
                  {userInfo ? (
                    <div className="mobiledropdown">
                      <ul className="mobiledropdowncontent">
                        <li>
                          <Link to="/profile">Profil</Link>
                        </li>
                        <li>
                          <Link to="/orderhistory">Sifariş Tarixçəsi</Link>
                        </li>
                        <li>
                          <Link to="#signout" onClick={signoutHandler}>
                            Çıxış et
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link to="/signin">Sign In</Link>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <div className="mobiledropdown">
                      <ul className="mobiledropdowncontent">
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/productlist">Products</Link>
                        </li>
                        <li>
                          <Link to="/orderlist">Orders</Link>
                        </li>
                        <li>
                          <Link to="/userlist">Users</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={
                searchmenu ? "mobilesearchmenu opensearch" : "mobilesearchmenu"
              }
            >
              <div>
                <div className="appsearch">
                  <Route
                    render={({ history }) => (
                      <SubSearch history={history}></SubSearch>
                    )}
                  ></Route>
                </div>
              </div>
            </div>
            <div
              className="searchbtn"
              onClick={() => {
                setSearchmenu(true);
              }}
            >
              <AiOutlineSearch />
            </div>
            <div
              className="hamburgermenu"
              onClick={() => {
                setOpenMobile(true);
              }}
            >
              <AiOutlineMenu />
            </div>
          </div>
        </header>

        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>

          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="">
          <div>
            <Footer />
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
