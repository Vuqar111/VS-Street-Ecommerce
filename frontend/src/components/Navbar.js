import React, {useState} from "react";
import {Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../common/actions/userActions";
import SearchBox from "../components/SearchBox";
import SubSearch from "../components/SubSearch";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const [openMobile, setOpenMobile] = useState(false);
  const [searchmenu, setSearchmenu] = useState(false);
  return (
    <>
      <header className="row rownavbar wmax">
        <div className="row wnormal">
          <div>
            <Link className="brand" to="/">
              VS-<span className="greenlink">Street</span>
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div className="desktopmenu row">
            <Link to="/cart">
              <div className="row column">
                <div className="text-[25px]">
                  <AiOutlineShoppingCart />
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </div>
                <div>Səbət</div>
              </div>
            </Link>

            <div>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    <div className="row column">
                      <div className="text-[25px]">
                        <BsFillPersonFill />
                      </div>
                      <div>{userInfo.name}</div>
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
                      <Link to="/contact">Kömək</Link>
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
                  <div className="row column">
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
                    <div className="row column">
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
                    <li>
                      <Link to="/couponlist">Kuponlar</Link>
                    </li>
                    <li>
                      <Link to="/seasonlist">Model</Link>
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
              <div className="row">
                <div>
                  <Link className="brand" to="/">
                    VS-<span className="greenlink">Street</span>
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
                  Səbət
                  {cartItems.length > 0 && (
                    <span className="badge mobilebadge">
                      {cartItems.length}
                    </span>
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
                  <Link to="/signin">Daxil Ol</Link>
                )}

                {userInfo && userInfo.isAdmin && (
                  <div className="mobiledropdown">
                    <ul className="mobiledropdowncontent">
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
                      <li>
                        <Link to="/couponlist">Kuponlar</Link>
                      </li>
                      <li>
                        <Link to="/seasonlist">Model</Link>
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
          <div className="row mobilecomponent">
            <Link to="/search/name">
              <div className="searchbtn">
                <AiOutlineSearch />
              </div>
            </Link>

            <div
              className="hamburgermenu"
              onClick={() => {
                setOpenMobile(true);
              }}
            >
              <AiOutlineMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
