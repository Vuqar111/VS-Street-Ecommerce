import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsSeason, updateSeason } from "../actions/seasonActions";
import LoadingBox from "../components/LoadingBox";
import Axios from 'axios';
import MessageBox from "../components/MessageBox";
import { SEASON_UPDATE_RESET } from "../constants/seasonConstants";

export default function SeasonEditScreen(props) {
  const seasonId = props.match.params.id;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const seasonDetails = useSelector((state) => state.seasonDetails);
  const { loading, error, season } = seasonDetails;

  const seasonUpdate = useSelector((state) => state.seasonUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = seasonUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/seasonlist");
    }
    if (!season || season._id !== seasonId || successUpdate) {
      dispatch({ type: SEASON_UPDATE_RESET });
      dispatch(detailsSeason(seasonId));
    } else {
      setTitle(season.title);
      setImage(season.image);
    }
  }, [season, dispatch, seasonId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update season
    dispatch(
      updateSeason({
        _id: seasonId,
        title,
        image,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Create / Edit Season {seasonId}</h2>
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

              <div>
                <label htmlFor="image">Image</label>
                <input
                  id="image"
                  type="text"
                  className="p-[1rem]"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="imageFile">Image File</label>
                <input
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  className="p-[1rem]"
                  onChange={uploadFileHandler}
                ></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
              </div>
              <div>
                <label></label>
                <button
                  className="bg-[#08AD76] text-[white] p-[1rem] mt-[15px]"
                  type="submit"
                >
                  Update/Create Season
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
