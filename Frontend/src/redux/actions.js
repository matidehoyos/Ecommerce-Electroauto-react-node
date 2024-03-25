import { LOAD_PRODUCTOS, LOAD_USER_DATA, RESET_USER_DATA } from "./actions-types";


export const loadUserData = (data) => ({
  type: LOAD_USER_DATA,
  payload: data,
});

export const resetUserData = () => ({
  type: RESET_USER_DATA
});

export const loadProductos = (data) => ({
  type: LOAD_PRODUCTOS,
  payload: data,
});