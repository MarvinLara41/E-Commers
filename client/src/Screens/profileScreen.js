import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, update } from '../actions/userActions';

function ProfileScreen(props) {
	const dispatch = useDispatch();

	const [name, setName] = useState();

	const [password, setPassword] = useState();

	const [email, setEmail] = useState();

	const userUpdate = useSelector((state) => state.userUpdate);

	const { loading, success, error } = userUpdate;

	const handleLogOut = () => {
		dispatch(logout());
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(update(email, name, password));
	};

	return (
		<div>
			<div className="profile">
				<div className="profile-info">
					<div className="form">
						<form onSubmit={submitHandler}>
							<ul className="form-container">
								<li>
									<h3> User Profile</h3>
								</li>
								<li>
									{loading && <div> Loading... </div>}
									{error && <div> {error} </div>}
									{success && <div> Profile Saved Successfully. </div>}
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
										Update Profile
									</button>
								</li>
								<li>
									<button onClick={handleLogOut} className="button secondary">
										LogOut
									</button>
								</li>
							</ul>
						</form>
					</div>

					<div className="profile-orders"></div>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
