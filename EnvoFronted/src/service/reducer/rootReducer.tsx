import { combineReducers } from "redux";
import {
  cartReducer,
  GetProductReducer,
  orderReducer,
  paidOrderReducer,
  registrationReducer,
  UnPaidOrderReducer,
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
  UnPaidOrders : UnPaidOrderReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
