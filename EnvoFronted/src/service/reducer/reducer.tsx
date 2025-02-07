import {
  ADD_TO_CART,
  CHECKOUT_SUCCESS,
  CONTACT_SUCCESS,
  FETCH_PAID_ORDERS,
  FETCH_UNPAID_ORDERS,
  GET_PRODUCT,
  GET_SINGAL_PRODUCT,
  LOGIN_SUCCESS,
  PRODUCT_SUCCESS,
  REGISTER_SUCCESS,
} from "../Constant";

const initialState = {
  userSignuP: null,
};

export const registrationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        userSignuP: action.payload,
      };
    default:
      return state;
  }
};

const initialState1 = {
  data: null,
};
export const LoginReducer = (state = initialState1, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
const initialState2 = {
  userData: null,
};
export const AddProductReducer = (state = initialState2, action: any) => {
  switch (action.type) {
    case PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
const initialState7 = {
  data: [],
};
export const SingalProductReducer = (state = initialState7, action: any) => {
  console.log(state, "reducer data");

  switch (action.type) {
    case GET_SINGAL_PRODUCT:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const initialState3 = {
  data: [],
};
export const GetProductReducer = (state = initialState3, action: any) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const storedCart = localStorage.getItem("cart");
const initialState4 = {
  cartItems: storedCart ? JSON.parse(storedCart) : [],
};

// Define the cart reducer
export const cartReducer = (state = initialState4, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );

      let updatedCartItems;

      if (existingProductIndex !== -1) {
        updatedCartItems = state.cartItems.map((item: any, index: any) =>
          index === existingProductIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.price, // Update totalPrice
              }
            : item
        );
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price, // Initialize totalPrice correctly
        };
        updatedCartItems = [...state.cartItems, newItem];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    default:
      return state;
  }
};

const initialState5 = {
  data: [],
};
export const orderReducer = (state = initialState5, action: any) => {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const initialState8 = {
  paidOrders: [],
};

export const paidOrderReducer = (state = initialState8, action: any) => {
  switch (action.type) {
    case FETCH_PAID_ORDERS:
      return {
        ...state,
        paidOrders: action.payload,
      };
    default:
      return state;
  }
};
const initialState9 = {
  UnpaidOrders: [],
};

export const UnPaidOrderReducer = (state = initialState9, action: any) => {
  switch (action.type) {
    case FETCH_UNPAID_ORDERS:
      return {
        ...state,
        UnpaidOrders: action.payload,
      };
    default:
      return state;
  }
};
const initialState10 = {
  message: [],
};

export const messageReducer = (state = initialState10, action: any) => {
  switch (action.type) {
    case CONTACT_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
