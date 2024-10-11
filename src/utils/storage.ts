// import { Product } from '../types/products';

// export const saveLocalStorage = (cart: Product[]) => {
//   localStorage.setItem('cart', JSON.stringify(cart));
// };

// export const getCartFromLocalStorage = () => {
//   const savedCart = localStorage.getItem('cart');
//   return savedCart ? JSON.parse(savedCart) : [];
// };


// export const setLocalStorage = (data: any, key: string) => {
//   localStorage.setItem(key, JSON.stringify(data));
// };

// export const getLocalStorage = (key:string) => {
//   const data = localStorage.getItem(key);
//   return data ? JSON.parse(data) : "";
// };

const get = (key: any, defaultValue: any) => {
  const value = localStorage.getItem(key) || sessionStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

const set = (key: any, value: any, session: boolean = false) => {
  const storage = session ? sessionStorage : localStorage;
  const parsed = JSON.stringify(value);

  storage.setItem(key, parsed);
};

export default {
  get, 
  set,
};