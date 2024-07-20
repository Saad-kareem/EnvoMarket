import { combineReducers } from "redux";
import {
  cartReducer,
  GetProductReducer,
  orderReducer,
  paidOrderReducer,
  registrationReducer,
} from "./reducer";
import { LoginReducer } from "./reducer";
import { SingalProductReducer } from "./reducer";
export const rootReducer = combineReducers({
  registrationReducer,
  LoginReducer,
  data: GetProductReducer,
  cart: cartReducer,
  orderReducer,
  singalData: SingalProductReducer,
  orders: paidOrderReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
