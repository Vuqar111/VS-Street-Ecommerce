import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSeasons } from "../actions/seasonActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
const PopularCategories = () => {
  const seasonList = useSelector((state) => state.seasonList);
  const { loading, error, seasons } = seasonList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSeasons({}));
  }, [dispatch]);

  return (
    <>
      <div className="featuredtext">
        <h1 className="populartitle">
          <span className="clipspan">Məşhur </span> Kateqoriyalar
        </h1>
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {seasons.length === 0 && (
              <MessageBox>İstəyinizə uyğun kateqoriya tapılmadı</MessageBox>
            )}
            <div className="row wnormal">
              {seasons.slice(0, 3).map((season) => {
                return (
                  <Link to="/search/name">
                    <div key={season._id} className="box">
                      <div className="boximg row">
                         <img src={season.image} alt={season.title} />
                      </div>
                      <Link to="/search/name">
                        <p className="subimglink">Kəşf Et</p>
                      </Link>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
      </>
  );
};


export default PopularCategories