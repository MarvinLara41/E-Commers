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
import ProfileScreen from './screens/profileScreen';
import OrderScreen from './screens/orderScreen';
import OrdersScreen from './screens/ordersScreen';
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
						<Link to="/cart">Cart</Link>
						{userInfo ? (
							<Link to="/profile"> {userInfo.name} </Link>
						) : (
							<Link to="/signin">Sign In</Link>
						)}
						{userInfo && userInfo.isAdmin && (
							<div className="dropdown">
								<a href="#"> Admin </a>
								<ul className="dropdown-contents">
									<li>
										<Link to="/orders">Orders </Link>
										<Link to="/products"> Prodoucts</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</header>
				<aside className="sidebar">
					<h4>Shopping Categories</h4>
					<button className="sidebar-close-button" onClick={closeMenu}>
						x
					</button>
					<ul className="categories">
						<li>
							<Link to="/category/Pants">Pants</Link>
						</li>
						<li>
							<Link to="/category/Shirts">Shirts</Link>
						</li>
					</ul>
				</aside>
				<main className="main">
					<div className="content">
						<Route path="/orders" component={OrdersScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/order/:id" component={OrderScreen} />
						<Route path="/products" component={ProductsScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/signin" component={SignInScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/category/:id" component={HomeScreen} />
						<Route path="/" exact={true} component={HomeScreen} />
					</div>
				</main>
				<footer className="footer">All rights reserved.</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
