import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsCoupon, updateCoupon } from "../actions/couponActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { COUPON_UPDATE_RESET } from "../constants/couponConstants";

export default function CouponEditScreen(props) {
  const couponId = props.match.params.id;
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [amount_percent, setAmount] = useState(0);

  const couponDetails = useSelector((state) => state.couponDetails);
  const { loading, error, coupon } = couponDetails;

  const couponUpdate = useSelector((state) => state.couponUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = couponUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/couponlist");
    }
    if (!coupon || coupon._id !== couponId || successUpdate) {
      dispatch({ type: COUPON_UPDATE_RESET });
      dispatch(detailsCoupon(couponId));
    } else {
      setTitle(coupon.title);
      setCode(coupon.author);
      setAmount(coupon.amount_percent);
    }
  }, [coupon, dispatch, couponId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateCoupon({
        _id: couponId,
        title,
        code,
        amount_percent,
      })
    );
  };
  

  

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Create / Edit Coupon {couponId}</h2>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="w-[100%] mt-[20px]">
              <div className="w-[400px]">
                <label htmlFor="name">Title</label>
                <input
                  id="title"
                  type="text"
                  className="w-[400px] p-[1rem]"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>

              <div className="w-[400px] mt-[10px]">
                <label htmlFor="code">Code</label>
                <input
                  id="code"
                  type="text"
                  className="w-[400px] p-[1rem]"
                  placeholder="Enter Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></input>
              </div>


              <div className="w-[400px] mt-[10px]">
                <label htmlFor="name">Amount</label>
                <input
                  id="title"
                  type="number"
                  className="w-[400px] p-[1rem]"
                  placeholder="Enter Amount"
                  value={amount_percent}
                  onChange={(e) => setAmount(e.target.value)}
                ></input>
              </div>
              
          

              <div>
                <label></label>
                <button className="bg-[#08AD76] text-[white] p-[1rem] mt-[15px]" type="submit">
                  Update/Create Coupon
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}