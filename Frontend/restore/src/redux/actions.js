import { ADD_TO_CART, REMOVE_FROM_CART } from './action-types';

export const addToCart = (item) => {
  let storedCart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
  storedCart = [...storedCart, item];
  localStorage.setItem('cart', JSON.stringify(storedCart));

  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (item) => {
  let storedCart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
  storedCart = storedCart.filter(
    (localStorageItem) => localStorageItem._id !== item._id
  );
  localStorage.setItem('cart', JSON.stringify(storedCart));
  return {
    type: REMOVE_FROM_CART,
    payload: item,
  };
};
