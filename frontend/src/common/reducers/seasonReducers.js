import {
    SEASON_LIST_FAIL,
    SEASON_LIST_REQUEST,
    SEASON_LIST_SUCCESS,
    SEASON_DETAILS_REQUEST,
    SEASON_DETAILS_SUCCESS,
    SEASON_DETAILS_FAIL,
    SEASON_DELETE_FAIL,
    SEASON_DELETE_REQUEST,
    SEASON_DELETE_RESET,
    SEASON_DELETE_SUCCESS,
    SEASON_CREATE_FAIL,
    SEASON_CREATE_REQUEST,
    SEASON_CREATE_RESET,
    SEASON_CREATE_SUCCESS,
    SEASON_UPDATE_FAIL,
    SEASON_UPDATE_REQUEST,
    SEASON_UPDATE_RESET,
    SEASON_UPDATE_SUCCESS
  } from '../constants/seasonConstants';
  
export const seasonListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case SEASON_LIST_REQUEST:
        return { loading: true };
      case SEASON_LIST_SUCCESS:
        return { loading: false, seasons: action.payload };
      case SEASON_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const seasonDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case SEASON_DETAILS_REQUEST:
        return { loading: true };
      case SEASON_DETAILS_SUCCESS:
        return { loading: false, season: action.payload };
      case SEASON_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  
  


  export const seasonCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SEASON_CREATE_REQUEST:
        return { loading: true };
      case SEASON_CREATE_SUCCESS:
        return { loading: false, success: true, season: action.payload };
      case SEASON_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SEASON_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const seasonUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case SEASON_UPDATE_REQUEST:
        return { loading: true };
      case SEASON_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case SEASON_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case SEASON_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };


  export const seasonDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SEASON_DELETE_REQUEST:
        return { loading: true };
      case SEASON_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SEASON_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case SEASON_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  