import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import loginimg from "../assets/login.svg";
export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className="signinscreen">
      <div className="loginimg">
        <img src={loginimg} alt="loginimg" />
      </div>
      <div className="loginform">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1 className="mt-[30px] text-center text-[35px] font-bold">
              Daxil Ol
            </h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="greenbtn" type="submit">
              Daxil Ol
            </button>
          </div>
          <p className="text-center font-bold mt-[10px]">OR</p>
          <div className="mt-[10px] text-center">
            <div className="p-[10px]">
              Hesabın yoxdur ?{" "}
              <Link className="font-bold" to={`/register?redirect=${redirect}`}>
                Qeydiyyat
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
