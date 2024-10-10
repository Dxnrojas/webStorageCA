// import { Product } from '../types/products';

// export const saveLocalStorage = (cart: Product[]) => {
//   localStorage.setItem('cart', JSON.stringify(cart));
// };

// export const getCartFromLocalStorage = () => {
//   const savedCart = localStorage.getItem('cart');
//   return savedCart ? JSON.parse(savedCart) : [];
// };

export const setLocalStorage = (data: any, key: string) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key:string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : "";
};