import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_REGISTER_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCESS,
  USER_DETAIL_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAIL_RESET,
} from '../constant/userConstant';

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const response = await axios.post(`/api/users/login/`, {
      username: email,
      password: password,
    });
    dispatch({ type: USER_LOGIN_SUCESS, payload: response.data });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.response,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAIL_RESET });
};

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const response = await axios.post(`/api/users/register/`, {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCESS, payload: response.data });
    dispatch({ type: USER_LOGIN_SUCESS, payload: response.data });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.response,
    });
  }
};

export const userDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST });

    // userLoginReducer;
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get(`/api/users/${id}/`, config);
    dispatch({ type: USER_DETAIL_SUCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.response,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    // userLoginReducer;
    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.put(`/api/users/updateprofile/`, user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCESS, payload: response.data });
    dispatch({ type: USER_LOGIN_SUCESS, payload: response.data });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.response,
    });
  }
};
