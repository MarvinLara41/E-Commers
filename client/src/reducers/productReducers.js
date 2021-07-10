import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_SAVE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };

    case PRODUCT_SAVE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_SAVE_RESET:
      return {};

    default:
      return state;
  }
};

const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
export {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productUpdateReducer,
};
