import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShipping } from "../actions/cartActions";

import CheckOutSteps from "../components/CheckOutSteps";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  /** if user isnt signed in they will be pushed to the sign screen */
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push("/signin");
  }
  /**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /** if user has to re-signin they're shipping in will be saved */
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    /**Dispatch action for shipping address */

    dispatch(saveShipping({ fullName, address, city, postalCode, country }));

    props.history.push("/payment");
  };

  return (
    <div>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Adress</h1>
        </div>
        <div>
          <label htmlFor="fullName"></label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address"></label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city"></label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode"></label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Zip Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country"></label>
          <input
            type="text"
            id="Country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <label />
        <button className="primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
