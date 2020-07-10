import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';

import {
	productListReducer,
	productDetailsReducer,
	productSaveReducer,
	productDeleteReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducer';

import {
	userSigninReducer,
	userRegisterReducer,
	userUpdateReducer,
} from './reducers/userReducers';

import {
	OrderCreateReducer,
	OrderDetailsReducer,
	OrderPayReducer,
	myOrderListReducer,
} from './reducers/orderReducer';

const cartItems = Cookie.getJSON('cartItems') || [];

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
	cart: { cartItems },
	shipping: {},
	payment: {},
	userSignin: { userInfo },
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
	orderCreate: OrderCreateReducer,
	orderDetails: OrderDetailsReducer,
	orderPay: OrderPayReducer,
	userUpdate: userUpdateReducer,
	myOrderList: myOrderListReducer,
});

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnchancer(applyMiddleware(thunk))
);
//thunk is a middleware for redux, allows me to run async opperation in redux
export default store;
