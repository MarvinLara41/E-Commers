import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/productScreen';
import HomeScreen from './screens/homeScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import SignInScreen from './screens/signInScreen';
import PaymentScreen from './screens/paymentScreen';
import RegisterScreen from './screens/RegisterScreen';
import PlaceOrderScreen from './screens/placeOrderScreen';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const openMenu = () => {
		document.querySelector('.sidebar').classList.add('open');
	};

	const closeMenu = () => {
		document.querySelector('.sidebar').classList.remove('open');
	};
	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="header">
					<div className="brand">
						<button onClick={openMenu}>&#9776;</button>
						<Link to="/"> E-Commers </Link>
					</div>
					<div className="header-links">
						<a href="cart.html">Cart</a>
						{userInfo ? (
							<Link to="/profile"> {userInfo.name} </Link>
						) : (
							<Link to="/signin">Sign In</Link>
						)}
					</div>
				</header>
				<aside className="sidebar">
					<h4>Shopping Categories</h4>
					<button className="sidebar-close-button" onClick={closeMenu}>
						x
					</button>
					<ul>
						<li>
							<a href="index.html">Pants</a>
						</li>
						<li>
							<a href="index.html">Shirts</a>
						</li>
					</ul>
				</aside>
				<main className="main">
					<div className="content">
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/products" component={ProductsScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/signin" component={SignInScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/" exact={true} component={HomeScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
					</div>
				</main>
				<footer className="footer">All rights reserved.</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
