import axios from 'axios';

import { ADD_TO_CART, REMOVE_FROM_CART } from '../constant/cartConstant';

export const addToCartAction = (id, qty) => async (dispatch, getstate) => {
  try {
    const response = await axios.get(`/api/products/${id}`);

    dispatch({
      type: ADD_TO_CART,
      // payload: 'hello',
      payload: {
        product: response.data._id,
        name: response.data.name,
        image: response.data.image,
        price: response.data.price,
        countInStock: response.data.countInStock,
        // ...response.data,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getstate().cartReducer.cartItems)
    );
  } catch (error) {
    console.log('error on cart page' + error);
  }
};

export const RemoveFromCartAction = (id) => async (dispatch, getstate) => {
  dispatch({
    type: REMOVE_FROM_CART,

    payload: id,
  });
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getstate().cartReducer.cartItems)
  );
};
