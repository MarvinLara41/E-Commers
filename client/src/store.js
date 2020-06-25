import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';

const initialState = {};
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	compose(applyMiddleware(thunk))
);
//thunk is a middleware for redux, allows me to run async opperation in redux
export default store;
