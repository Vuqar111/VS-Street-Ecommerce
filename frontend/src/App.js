import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import OrderScreen from "./pages/OrderScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import ProductListScreen from "./pages/ProductListScreen";
import ProductScreen from "./pages/ProductScreen";
import ProfileScreen from "./pages/ProfileScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import SigninScreen from "./pages/SigninScreen";
import SearchScreen from "./pages/SearchScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import OrderListScreen from "./pages/OrderListScreen";
import UserListScreen from "./pages/UserListScreen";
import UserEditScreen from "./pages/UserEditScreen";
import CouponListScreen from "./pages/CouponListScreen";
import CouponEditScreen from "./pages/CouponEditScreen";
import SeasonListScreen from "./pages/SeasonListScreen";
import SeasonEditScreen from "./pages/SeasonEditScreen";
import DashboardScreen from "./pages/DashboardScreen";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import ContactForm from "./components/Contact";
import About from "./components/About";
function App() {
  return (
    <BrowserRouter>
      <div className="w-[100%]">
        <Navbar />
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
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/contact" component={ContactForm}></Route>
          <Route path="/about" component={About}></Route>
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
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/couponlist"
            component={CouponListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/coupon/:id/edit"
            component={CouponEditScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/season/:id/edit"
            component={SeasonEditScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/seasonlist"
            component={SeasonListScreen}
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
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
