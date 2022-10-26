import { ADD_TO_CART, REMOVE_FROM_CART } from '../constant/cartConstant';

export const cartReducer = (state = { cartItems: [] }, action) => {
  console.log(action.type);
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (ele) => ele.product != action.payload
        ),
      };

    default:
      return state;
  }
};
