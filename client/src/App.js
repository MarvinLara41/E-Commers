import React from 'react';
import './App.css';
import ProductScreen from './screens/productScreen';
import HomeScreen from './screens/homeScreen';
import CartScreen from './screens/CartScreen';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App(props) {
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
						<a href="signin.html">Sign In</a>
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
