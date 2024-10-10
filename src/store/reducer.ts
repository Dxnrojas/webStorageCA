import { AppState } from '../types/store';
import { ADD_TO_CART, SET_PRODUCTS, DELETE_CART, DELETE_CART_PRODUCT } from './actions';

const initialState: AppState = {
  products: [],
  cart: [],
};

export interface Action {
    type: string;
    payload: any;
  }

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case DELETE_CART:
        return { ...state, cart: [] };
    case DELETE_CART_PRODUCT:
        return { ...state, cart: state.cart.filter((product) => product.id !== action.payload) };
    default:
      return state;
  }
};

