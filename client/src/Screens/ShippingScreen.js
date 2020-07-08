import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

function ShippingScreen(props) {
	const [address, setAddress] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(saveShipping({ address, city, postalCode, state, country }));

		props.history.push('payment');
	};

	return (
		<div>
			<CheckOutSteps step1 step2>
				{' '}
			</CheckOutSteps>
			<div className="form">
				<form onSubmit={submitHandler}>
					<ul className="form-container">
						<li>
							<h3> Shipping </h3>
						</li>
						<li>
							<label htmlFor="address">Address</label>
							<input
								type="address"
								name="address"
								id="address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								placeholder="Address"
							></input>
						</li>
						<li>
							<label htmlFor="city">City</label>
							<input
								type="city"
								name="city"
								id="city"
								onChange={(e) => setCity(e.target.value)}
								placeholder="City"
							></input>
						</li>
						<li>
							<label htmlFor="postalCode">postalCode</label>
							<input
								type="postalCode"
								name="postalCode"
								id="postalCode"
								onChange={(e) => setPostalCode(e.target.value)}
								placeholder="Postal-Code"
							></input>
						</li>
						<li>
							<label htmlFor="state">State</label>
							<input
								type="state"
								name="state"
								id="state"
								onChange={(e) => setState(e.target.value)}
								placeholder="State"
							></input>
						</li>

						<li>
							<label htmlFor="country">Country</label>
							<input
								type="country"
								name="country"
								id="country"
								onChange={(e) => setCountry(e.target.value)}
								placeholder="Country"
							></input>
						</li>
						<li>
							<button type="submit" className="button primary ">
								Continue
							</button>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
}

export default ShippingScreen;
