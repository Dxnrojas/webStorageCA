import { Product } from "./products";

export type Observer = { render: () => void } & HTMLElement;

export interface AppState {
  products: Product[];
  cart: Product[];
  screen: string;
  state: string;
  user: string;
  uid: number,
}
