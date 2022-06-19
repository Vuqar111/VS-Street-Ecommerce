import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSeason, deleteSeason, listSeasons } from "../common/actions/seasonActions";
import {
  SEASON_CREATE_RESET,
  SEASON_DELETE_RESET,
} from "../common/constants/seasonConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


export default function SeasonListScreen(props) {
  const seasonList = useSelector((state) => state.seasonList);
  const { loading, error, seasons } = seasonList;

  const seasonCreate = useSelector((state) => state.seasonCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    season: createdSeason,
  } = seasonCreate;

  const seasonDelete = useSelector((state) => state.seasonDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = seasonDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SEASON_CREATE_RESET });
      props.history.push(`/season/${createdSeason._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: SEASON_DELETE_RESET });
    }
    dispatch(listSeasons());
  }, [createdSeason, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (season) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteSeason(season._id));
    }
  };
  const createHandler = () => {
    dispatch(createSeason());
  };

  console.log(seasons);
  return (
    <div className="row wnormal">
      <div className="row wmax">
      <h2>Modeller</h2>
        <button type="button" className="bg-[#08AD76] text-[white] p-[1rem]" onClick={createHandler}>
         Model Yarat
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
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {seasons.map((season) => (
                <tr key={season._id}>
                  <td>{season.title}</td>
                

                  <td>
                    <button
                      type="button"
                      className="bg-[#08AD76] text-[white] p-[1rem]"
                      onClick={() =>
                        props.history.push(`/season/${season._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="bg-[red] text-[white] p-[1rem]"
                      onClick={() => deleteHandler(season)}
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