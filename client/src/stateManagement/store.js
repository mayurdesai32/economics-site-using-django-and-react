import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import {
  ProductListReducer,
  ProductDetailReducer,
} from './reducer/productReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
} from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';

const reducer = combineReducers({
  ProductListReducer,
  ProductDetailReducer,
  cartReducer,
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
  },
  userLoginReducer: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

export default store;
