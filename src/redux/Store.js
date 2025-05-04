import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlice";
import SearchSlice from "./slices/SearchSlice";
import authReducer from "./slices/authSlice";


const Store = configureStore({
  reducer: {
    cart: CartSlice,
    search: SearchSlice,
    auth: authReducer,
  },
});
export default Store; 