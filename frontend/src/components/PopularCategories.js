import React, { useEffect } from "react";
import styled from "styled-components";
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
    <Wrapper>
      <div className="featuredtext">
        <h1 className="populartitle">
          <span className="clipspan">Məşhur </span> Kateqoriyalar
        </h1>
      </div>
      <div className="mainpopularsec">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {seasons.length === 0 && (
              <MessageBox>İstəyinizə uyğun kateqoriya tapılmadı</MessageBox>
            )}
            <div className="homeproductsmain row">
              {seasons.slice(0, 3).map((season) => {
                return (
                  <Link to="/search/name">
                    <div key={season._id} className="box">
                      <div className="boximg">
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  .box {
    position: relative;
    min-width: 300px;
    height: 100%;
    width: 100%;
    margin-top: 10px;
  }
  .boximg {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--white-color);
    max-width: 300px;
    width: 100%;
    height: 350px;
    transition: all 0.5s ease-in-out;
  }
  .boximg img {
    width: 100%;
    height: 100%;
    max-height: 350px;
    object-fit: cover;
  }

  .boximg:hover {
    transform: scale(1.1);
    transition: all 0.5s ease-in-out;
  }
  .footer {
    margin-top: 5px;
    h3 {
      font-size: 15px;
      font-weight: bold;
    }
  }

  .subimglink {
    position: absolute;
    bottom: 10%;
    left: 50%;
    padding: 10px;
    transform: translateX(-50%);
    color: white;
    background: #08ad76;
  }

  @media (max-width: 768px) {
    width: 80%;

    .box {
      min-width: 280px;
      height: 100%;
      width: 100%;
      margin-top: 10px;
    }
    .boximg {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--white-color);
      max-width: 300px;
      width: 100%;
      height: 350px;
    }
    .boximg img {
      width: 100%;
      height: 100%;
      max-height: 350px;
      object-fit: cover;
    }
    .footer {
      margin-top: 5px;
      h3 {
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
`;
export default PopularCategories;
