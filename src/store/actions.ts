import { Product } from '../types/products';
import { apiProducts } from '../services/getProducts';

export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const DELETE_CART = 'DELETE_CART';
export const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT';   

export const addToCart = (product: Product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const deleteCart = () => ({
  type: DELETE_CART,
  payload: [],
});

export const deleteCartProduct = (id: number) => ({
    type: DELETE_CART_PRODUCT,
    payload: id,
});

export const getProductsRedux = async () => {
    const products = await apiProducts();
    return {
        type: SET_PRODUCTS,
        payload: products,
    };
};
