import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [rePassword, setrePassword] = useState('');
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();
	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
		return () => {};
	}, [userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(register(name, email, password));
	};

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						<h3> Register </h3>
					</li>
					<li>
						{loading && <div> Loading... </div>}
						{error && <div> {error} </div>}
					</li>
					<li>
						<label htmlFor="Name">Name</label>
						<input
							type="name"
							name="name"
							id="name"
							onChange={(e) => setName(e.target.value)}
							placeholder="Name"
						></input>
					</li>
					<li>
						<label htmlFor="email">Email</label>
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
					{/* <li>
						<label htmlFor="rePassword">Re-Enter Password </label>
						<input
							type="rePassword"
							id="rePassword"
							name="rePassword"
							onChange={(e) => setrePassword(e.target.value)}
							placeholder="Re-Enter Password"
						></input>
					</li> */}
					<li>
						<button type="submit" className="button primary ">
							Register
						</button>
					</li>
					<li>
						Already have an accont?{' '}
						<Link
							to={
								redirect === '/' ? 'register' : 'register?redirect=' + redirect
							}
						>
							{' '}
							Sign-In{' '}
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
}

export default RegisterScreen;
