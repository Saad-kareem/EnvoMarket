import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  PRODUCT_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_PRODUCT,
  ADD_TO_CART,
  CHECKOUT,
  CHECKOUT_SUCCESS,
  GET_SINGAL_PRODUCT,
  FETCH_PAID_ORDERS,
} from "../Constant";

const base_url = "http://localhost:3000";

// get singal Product Action
export const singleProductSuccess = (data: any) => ({
  type: GET_SINGAL_PRODUCT,
  payload: data,
});

// Check out action
export const checkoutSuccess = (orderData: {
  cart: any;
  userAddress: string;
  email: string;
}) => ({
  type: CHECKOUT_SUCCESS,
  payload: orderData,
});

// User Register Action
export const registerSuccess = (data: any) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

// User Login Action
export const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

// Product Action
export const AddProductSuccess = (data: any) => ({
  type: PRODUCT_SUCCESS,
  payload: data,
});

// Get Product Action
const fetchDataSuccess = (data: any) => ({
  type: GET_PRODUCT,
  payload: data,
});

//Add To Cart
export const addToCart = (item: any) => {
  console.log(item, "item data");

  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

// Add Product API
export const productAdd = (Productes: any) => {
  return (dispatch: any) => {
    axios
      .post(`${base_url}/product/addProduct`, Productes)
      .then((response) => {
        const data = response.data;
        dispatch(AddProductSuccess(data));
        toast.success("Product added successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to Add Product. Please check your credentials.");
      });
  };
};

// get all prduct from database

export const productGet = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${base_url}/product/findAllProduct`);
      const data = response.data;
      dispatch(fetchDataSuccess(data));
    } catch (error: any) {
      console.log(error.message);
    }
  };
};
export const getSingalProduct = (id: number) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${base_url}/product/findOne/${id}`);
      const data = response.data;
      dispatch(singleProductSuccess(data));
      console.log(data, "action data");
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

// SignUp API Post Data
export const fetchData = (postData: any) => {
  return (dispatch: any) => {
    axios
      .post(`${base_url}/user/addUser`, postData)
      .then((response) => {
        const data = response.data;
        dispatch(registerSuccess(data));
        toast.success("User SignUp in successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to SignUp. Please check your credentials.");
      });
  };
};

// login api
export const loginUser = (data: any) => {
  return (dispatch: any) => {
    axios
      .post(`${base_url}/auth/login`, data)
      .then((response) => {
        const userData = response.data;
        dispatch(loginSuccess(userData));
        localStorage.setItem("token", userData.token);
        toast.success("User Logged in successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to login. Please check your credentials.");
      });
  };
};

export const OrderPlace = (
  data: any,
  userAddress: any,
  userEmail: string,
  sessionId: any
) => {
  return (dispatch: any) => {
    axios
      .post(`${base_url}/checkout`, {
        items: data,
        userAddress,
        userEmail,
        sessionId,
      })
      .then((response) => {
        const userData = response.data;
        dispatch(checkoutSuccess(userData));

        toast.success("Order Placed successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to Order Failder. Please try again");
      });
  };
};

export const fetchPaidOrders = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${base_url}/checkout/paidOrders`);
    dispatch({ type: FETCH_PAID_ORDERS, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
