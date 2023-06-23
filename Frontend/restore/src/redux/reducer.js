import { ADD_TO_CART, REMOVE_FROM_CART } from './action-types';

let storedCart = [];

if (typeof window !== 'undefined') {
  storedCart = localStorage.getItem('cart')
    ? {
        cart: JSON.parse(localStorage.getItem('cart')),
      }
    : {
        cart: [],
      };
}

const initialState = storedCart;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      //hacer logica por si viene un prod que ya esta
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
