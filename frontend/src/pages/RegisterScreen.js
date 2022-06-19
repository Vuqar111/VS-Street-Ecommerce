import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../common/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import registerimg from "../common/assets/images/registerpageicon.svg";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    if(password.length < 5) {
      alert("Please enter strong password")
    } else {
      dispatch(register(name, email, password));
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className="row wnormal">
      <div className="loginimg">
        <img src={registerimg} alt="register" />
      </div>
      <div className="loginform">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h2 className="mt-[30px] text-center">
            Qeydiyyat
            </h2>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
            <label htmlFor="name">Ad</label>
            <input
              type="text"
              id="name"
              placeholder="Adınızı daxil edin"
              className="p-[10px]"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Elektron poçt</label>
            <input
              type="email"
              id="email"
              placeholder="Email ünvanınızı daxil edin"
              className="p-[10px]"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Parol</label>
            <input
              type="password"
              id="password"
              placeholder="Parolunuzu daxil edin"
              className="p-[10px]"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="confirmPassword">Parolu təkrarla</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Parolunuzu təkrar edin"
              className="p-[10px]"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="bg-[#08AD76] text-[white] p-[1rem]" type="submit">
              Qeydiyyat
            </button>
          </div>
          <p className="text-center mt-[10px]">VƏ YA</p>
          <div className="mt-[10px] text-center">
            <div className="p-[10px]">
              Hesabın var?{" "}
              <Link  to={`/signin?redirect=${redirect}`}>
                Daxil ol
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
