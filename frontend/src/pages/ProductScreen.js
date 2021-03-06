import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { createReview, detailsProduct } from "../common/actions/productActions";
import { PRODUCT_REVIEW_CREATE_RESET } from "../common/constants/productConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("L");
  const [color, setColor] = useState("Black");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Rəyiniz uğurla göndərildi");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(
      `/cart/${productId}?qty=${qty}=size=${size}=color=${color}`
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Zəhmət olmasa rəyinizi əlavə edin");
    }
  };
  return (
    <Wrapper>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <Link to="/">Ana Səhifəyə qayıt</Link>
            <div className="main">
              <div className="row productimg ">
                <img src={product.image} alt={product.name}></img>
              </div>
              <div className="content ">
                <h2 className="productname">{product.name}</h2>
                <h6 className="text-[#08AD76]">
                  Məhsul Kodu: <span>{product._id}</span>
                </h6>
                <h6>
                  Marka: <span>VS-STREET</span>
                </h6>
                <h3 className="mt-[8px] mb-[8px] text-[28px] font-semibold">
                  {product.price} Azn
                </h3>
                <p className="text-[16px] mt-[8px] font-normal">
                  {product.description}
                </p>
                <p className="text-[16px] text-[red] mt-[8px] font-normal">
                 Note: {product.note}
                </p>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>

                <hr />
                <div>
                  <span >Uyğunluq:</span>
                  <span>
                    {product.countInStock > 0 ? (
                      <span>Stokdadır</span>
                    ) : (
                      <span> Stokda yoxdur</span>
                    )}
                  </span>
                </div>

                {product.countInStock > 0 && (
                  <>
                    <li className="w-[200px]">
                      <div className="row wmax">
                        <div>Rəng:</div>
                        <div className="sizeselect">
                          <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                          >
                            {["Ağ", "Qara", "Mavi", "Narıncı", "Boz"].map(
                              (x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </li>

                    <li className="w-[200px]">
                      <div className="row wmax">
                        <div>Ölçü:</div>
                        <div className="sizeselect">
                          <select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                          >
                            {["S", "M", "L", "XL"].map((x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </li>

                    <li className="w-[200px]">
                      <div className="row wmax">
                        <div>Ədəd:</div>
                        <div className="sizeselect">
                          <select
                            className=" p-[0px] "
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </li>

                    <li>
                      <button
                        onClick={addToCartHandler}
                        type="button"
                        className="flex flex-row w-[100%]  h-[40px] justify-center items-center my-5 bg-[#08AD76] p-3  cursor-pointer"
                      >
                        <p className="text-white text-base font-semibold text-[30px] carttext">
                          Karta əlavə et
                        </p>
                      </button>
                    </li>
                  </>
                )}
              </div>
            </div>
            <div className="w-[90%] m-[auto] mt-[50px] ">
              <h2 id="reviews" className="m-[0px] ">
                Rəylər
              </h2>
              {product.reviews.length === 0 && (
                <MessageBox>Məhsul barədə rəy yoxdur</MessageBox>
              )}
              <ul className="w-[100%]  m-[auto]">
                {product.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>İstifadəçi adı: {review.name}</strong>
                    <Rating rating={review.rating} caption=" "></Rating>
                    <p>Tarix: {review.createdAt.substring(0, 10)}</p>
                    <p>Rəy: {review.comment}</p>
                  </li>
                ))}
                <li>
                  {userInfo ? (
                    <form className="formreview" onSubmit={submitHandler}>
                      <div>
                        <h2 className="m-[0px] ">
                          Rəy yazın
                        </h2>
                      </div>
                      <div>
                        <label htmlFor="rating">Reytinq</label>
                        <select
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Seçin...</option>
                          <option value="1">1- Çox Pis</option>
                          <option value="2">2- Pis</option>
                          <option value="3">3- Yaxşı</option>
                          <option value="4">4- Çox Yaxşı</option>
                          <option value="5">5- Əla</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment">Koment</label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <label />
                        <button
                          className="bg-[#08AD76] text-[white] p-[1rem]"
                          type="submit"
                        >
                          Göndər
                        </button>
                      </div>
                      <div>
                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                        {errorReviewCreate && (
                          <MessageBox variant="danger">
                            {errorReviewCreate}
                          </MessageBox>
                        )}
                      </div>
                    </form>
                  ) : (
                    <MessageBox>
                      Rəy yazmaq üçün zəhmət olmasa <Link to="/signin">daxil olun</Link>
                    </MessageBox>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 30px;
  margn-bottom: 50px;

  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .main {
    display: flex;
    width: 100%;
  }
  .productname {
    font-size: 45px;
    font-weight: bold;
    margin: 0px;
  }

  select {
    border: 1px solid black;
  }

  .productimg {
    width: 50%;
    height: 550px;
    background-color: #f6f6f4;
  }

  .productimg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    width: 50%;
    margin-left: 30px;
    padding: 20px;
  }
.carttext {
  font-size: 25px;
}
  @media (max-width: 768px) {
    width: 95%;
    .main {
      flex-direction: column;
    }
    .content {
      width: 100%;
      margin-left: 0px;
    }
    .accordion {
      width: 100%;
    }

    .productname {
      font-size: 25px;
      font-weight: bold;
    }
    .carttext {
      font-size: 15px;
    }
    .productimg {
      width: 100%;
      height: 300px;
      background-color: #f6f6f4;
    }
  }
`;
