import { LOAD_PRODUCTOS, LOAD_USER_DATA, RESET_USER_DATA } from "./actions-types";


const initialState = {
  userData: {},
  productos: null,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case RESET_USER_DATA:
      return {
        ...state,
        userData: {},
      };
    case LOAD_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
      };
    default:
      return state;
  };
};

export default reducer;
