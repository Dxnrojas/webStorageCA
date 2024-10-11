import { Product } from '../types/products'; //Se importa el tipo Product desde el archivo types/products.ts
import { apiProducts } from '../services/getProducts'; //Se importa la función apiProducts desde el archivo services/getProducts.ts

export const ADD_TO_CART = 'ADD_TO_CART'; //Se crea la constante para definir la accion que se quiere hacer
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const DELETE_CART = 'DELETE_CART';
export const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT';   

export const addToCart = (product: Product) => ({ ///Se crea la funcion que se va a ejecutar cuando se dispare la accion, siendo el payload el producto que se va a agregar al carrito y type la accion que se quiere realizar
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
