import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function SignInScreen(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {};
	}, []);

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul>
					<li for="email">
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
						<label for="password">Password </label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						></input>
					</li>
				</ul>
			</form>
		</div>
	);
}

export default SignInScreen;
