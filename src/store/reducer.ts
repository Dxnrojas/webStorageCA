import { AppState } from '../types/store';
import { ADD_TO_CART, SET_PRODUCTS, DELETE_CART, DELETE_CART_PRODUCT } from './actions';

const initialState: AppState = {
    screen: 'DASHBOARD',
    cart: [],
    products: [],
    state: 'adding-to-cart',
    user: 'Daniela',
    uid: 1106514264,
};

export interface Action {
    type: string;
    payload: any;
}

export const reducer = (currentAction: any , currentState: any) => {
  switch (currentAction.type) {
    case SET_PRODUCTS:
      return { ...currentState, products: currentAction.payload };
    case ADD_TO_CART:
      return { ...currentState, cart: [...currentState.cart, currentAction.payload] };
    case DELETE_CART:
        return { ...currentState, cart: [] };
    case DELETE_CART_PRODUCT:
        return { ...currentState, cart: currentState.cart.filter((product: any) => product.uid !== currentAction.payload) };
    default:
      return currentState;
  }
};
