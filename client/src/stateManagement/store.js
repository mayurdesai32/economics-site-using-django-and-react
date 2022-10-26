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

import { cartReducer } from './reducer/cartReducer';

const reducer = combineReducers({
  ProductListReducer,
  ProductDetailReducer,
  cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
  },
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
