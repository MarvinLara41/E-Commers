import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/userActions.js";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  /**directs user on where to go based on if user is signed in or not */
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    /**Register action */

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
    } else {
      dispatch(register(name, email, password));
    }
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
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            placeholder="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email </label>
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
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
