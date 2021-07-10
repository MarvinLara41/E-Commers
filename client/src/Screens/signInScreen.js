import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signin } from "../actions/userActions.js";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  /**directs user on where to go based on if user is signed in or not */
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    /**Sign In action */
    /**after signin action userInfo will be filled in localstorage */

    dispatch(signin(email, password));
  };

  useEffect(() => {
    /**user will be directed to home page or redirect history */
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Signin</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer ?{" "}
            <Link to={`/register?redirect=${redirect}`}>Create Account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
