import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SignInScreen(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const userSignin = useSelector((state) => state.userSignin);
	const { loading, userInfo, error } = userSignin;
	const dispatch = useDispatch();

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(signin(email, password));
	};

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
		return () => {};
	}, [userInfo]);

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						<h3> Sign-In </h3>
					</li>
					<li>
						{loading && <div> Loading... </div>}
						{error && <div> {error} </div>}
					</li>
					<li htmlFor="email">
						<label>Email</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
						></input>
					</li>
					<li>
						<label htmlFor="password">Password </label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						></input>
					</li>
					<li>
						<button type="submit" className="button primary ">
							Sign In
						</button>
					</li>
					<li>New to E-Commers?</li>
					<li>
						<Link
							to={
								redirect === '/' ? 'register' : 'register?redirect=' + redirect
							}
							className="button text-center"
						>
							Register your account
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
}

export default SignInScreen;
