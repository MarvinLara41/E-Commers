import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/homeScreen";
import OrderScreen from "./Screens/orderScreen";
import OrdersScreen from "./Screens/ordersScreen";
import ProductScreen from "./Screens/productScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import SignInScreen from "./Screens/signInScreen";
import PaymentScreen from "./Screens/paymentScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import PlaceOrderScreen from "./Screens/placeOrderScreen";
import ProfileScreen from "./Screens/profileScreen";
import ListProductScreen from "./Screens/ListProductScreen";

/** ACTIONS */
import { logout } from "./actions/userActions";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(logout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              E-Commers
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>

                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#dropdown">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard"> DashBoard</Link>
                  </li>

                  <li>
                    <Link to="/productlist">Product List</Link>
                  </li>

                  <li>
                    <Link to="/orderlist">Order List</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main className="main">
          <Switch>
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ListProductScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SignInScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" component={HomeScreen} exact />
          </Switch>
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
