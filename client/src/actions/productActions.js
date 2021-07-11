import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
} from "../constants/productConstants";
import axios from "axios";

const listProducts =
  (category = "", searchKeyword = "", sortOrder = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        "/api/products?category=" +
          category +
          "&searchKeyword=" +
          searchKeyword +
          "&sortOrder=" +
          sortOrder
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

const saveProduct = (product) => async (dispatch, getState) => {
  /** saving product. the request carries the payload: product which is the information submitted in the Create Product form. in the const {data} I am adding this request to be posted in relation to the admin that submitted the request.  */
  dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post("/api/products", product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: PRODUCT_SAVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token} `,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
    payload: product,
  });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};

export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProduct,
  updateProduct,
};
