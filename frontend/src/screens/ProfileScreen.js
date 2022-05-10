import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Parol və təkrar parol eyni deyil");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
        })
      );
    }
  };
  return (
    <div className="row mt-[30px]">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="text-center font-bold text-[35px]">İstifadəçi məlumatları</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile uğurla yeniləndi
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Ad</label>
              <input
                id="name"
                type="text"
                placeholder="Adınızı daxil edin"
                value={name}
                className="p-[1rem]"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="p-[1rem]"
                placeholder="Email poçtunuzu daxil edin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Parol</label>
              <input
                id="password"
                type="password"
                className="p-[1rem]"
                placeholder="Parolunuzu daxil edin"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Parolu təkrarlayın</label>
              <input
                id="confirmPassword"
                type="password"
                className="p-[1rem]"
                placeholder="Parolunuzu təkrar daxil edin"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>

            <div>
              <label />
              <button className="bg-[#08AD76] text-[white] p-[1rem]" type="submit">
                Güncəllə
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
