import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { userSigninReducer } from './reducers/userReducers';
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { cart: { cartItems }, userSignin: { userInfo } };
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
});

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	compose(applyMiddleware(thunk))
);
//thunk is a middleware for redux, allows me to run async opperation in redux
export default store;
