import { reducer } from "./reducer";
import { AppState, Observer } from "../types/store";
import {setLocalStorage, getLocalStorage} from '../utils/storage';

//Crear el global state como un objeto
export let initialState = {
    screen: 'Dashboard',
    cart: [],
    products: [],
    state: 'adding-to-cart',
    user: 'Daniela',
    uid: 1106514264,
}

export let appState = getLocalStorage('STORE') || initialState;

let observers: Observer[] = [];

const persistStore = (state: any) => {
    setLocalStorage(state, 'STORE');
};

//Crear dispatch
export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(appState));
    const newState = reducer(action, clone);
    appState = newState;

    persistStore(newState);
    observers.forEach((observer) => observer.render());
};

export const addObserver = (ref: any) => {
    observers = [...observers, ref];
};
