import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

function PaymentScreen(props) {
	const [paymentMethod, setPaymentMethod] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(savePayment({ paymentMethod }));

		props.history.push('/placeorder');
	};

	return (
		<div>
			<CheckOutSteps step1 step2 step3></CheckOutSteps>
			<div className="form">
				<form onSubmit={submitHandler}>
					<ul className="form-container">
						<li>
							<h3>Payment</h3>
						</li>
						<li>
							<input
								type="radio"
								name="paymentMethod"
								id="paymentMethod"
								onChange={(e) => setPaymentMethod(e.target.value)}
								value="paypal"
							></input>
							<label htmlFor="paymentMethod">Pay-Pal</label>
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

export default PaymentScreen;
