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
  USER_DETAIL_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from '../constant/userConstant';

export const userLoginReducer = (
  state = { userInfo: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCESS:
      return { ...state, loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = { userInfo: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCESS:
      return { ...state, loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailReducer = (
  state = { user: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { ...state, loading: true };

    case USER_DETAIL_SUCESS:
      return { ...state, loading: false, user: action.payload };

    case USER_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_DETAIL_RESET:
      return { ...state, user: null };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = { user: null, success: false, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, success: false, error: null };

    case USER_UPDATE_PROFILE_SUCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload, success: false };

    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};
