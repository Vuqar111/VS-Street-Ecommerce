import Axios from 'axios';
import {
  SEASON_LIST_FAIL,
  SEASON_LIST_REQUEST,
  SEASON_LIST_SUCCESS,
  SEASON_DELETE_REQUEST,
  SEASON_DELETE_SUCCESS,
  SEASON_DELETE_FAIL,
  SEASON_DETAILS_FAIL,
  SEASON_DETAILS_REQUEST,
  SEASON_DETAILS_SUCCESS,
  SEASON_CREATE_FAIL,
  SEASON_CREATE_REQUEST,
  SEASON_CREATE_SUCCESS,
  SEASON_UPDATE_REQUEST,
  SEASON_UPDATE_SUCCESS,
  SEASON_UPDATE_FAIL,
} from '../constants/seasonConstants';

export const listSeasons = () => async (dispatch, getState) => {
    dispatch({ type: SEASON_LIST_REQUEST });
    try {
      const { data } = await Axios.get('/api/seasons');
      dispatch({ type: SEASON_LIST_SUCCESS, payload: data });
      console.log(data)
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SEASON_LIST_FAIL, payload: message });
    }
  };

  export const detailsSeason = (seasonId) => async (dispatch) => {
    dispatch({ type: SEASON_DETAILS_REQUEST, payload: seasonId });
    try {
      const { data } = await Axios.get(`/api/seasons/${seasonId}`);
      dispatch({ type: SEASON_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SEASON_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
export const createSeason = () => async (dispatch, getState) => {
    dispatch({ type: SEASON_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/seasons',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: SEASON_CREATE_SUCCESS,
        payload: data.season,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SEASON_CREATE_FAIL, payload: message });
    }
  };
  export const updateSeason = (season) => async (dispatch, getState) => {
    dispatch({ type: SEASON_UPDATE_REQUEST, payload: season });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/seasons/${season._id}`, season, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: SEASON_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SEASON_UPDATE_FAIL, error: message });
    }
  };

  export const deleteSeason = (seasonId) => async (dispatch, getState) => {
    dispatch({ type: SEASON_DELETE_REQUEST, payload: seasonId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.delete(`/api/seasons/${seasonId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: SEASON_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SEASON_DELETE_FAIL, payload: message });
    }
  };