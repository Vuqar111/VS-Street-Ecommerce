import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, deleteCoupon, listCoupons } from "../common/actions/couponActions";
import {
  COUPON_CREATE_RESET,
  COUPON_DELETE_RESET,
} from "../common/constants/couponConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox"

export default function CouponListScreen(props) {
  const couponList = useSelector((state) => state.couponList);
  const { loading, error, coupons } = couponList;

  const couponCreate = useSelector((state) => state.couponCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    coupon: createdCoupon,
  } = couponCreate;

  const couponDelete = useSelector((state) => state.couponDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = couponDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: COUPON_CREATE_RESET });
      props.history.push(`/coupon/${createdCoupon._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: COUPON_DELETE_RESET });
    }
    dispatch(listCoupons());
  }, [createdCoupon, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (coupon) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteCoupon(coupon._id));
    }
  };
  const createHandler = () => {
    dispatch(createCoupon());
  };

  console.log(coupons);
  return (
    <div className="row wnormal">
      <div className="row wmax">
      <h2>Kuponlar</h2>
        <button type="button" className="bg-[#08AD76] text-[white] p-[1rem]" onClick={createHandler}>
         Kupon Yarat
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>AUTHOR</th>
                <th>CATEGORY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon.title}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.amount_percent}</td>

                  <td>
                    <button
                      type="button"
                      className="bg-[#08AD76] text-[white] p-[1rem]"
                      onClick={() =>
                        props.history.push(`/coupon/${coupon._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="bg-[red] text-[white] p-[1rem]"
                      onClick={() => deleteHandler(coupon)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}