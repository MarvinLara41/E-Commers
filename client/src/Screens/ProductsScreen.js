import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct } from '../actions/productActions';

function ProductsScreen(props) {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState('');
	const [description, setDescription] = useState('');

	const productSave = useSelector((state) => state.productSave);
	const {
		loading: loadingSave,
		success: successSave,
		error: errorSave,
	} = productSave;
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {};
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			saveProduct({
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						<h3> Create a Product</h3>
					</li>
					<li>
						{loadingSave && <div> Loading... </div>}
						{errorSave && <div> {errorSave} </div>}
					</li>
					<li htmlFor="name">
						<label>Name</label>
						<input
							type="text"
							name="name"
							id="name"
							onChange={(e) => setName(e.target.value)}
							placeholder="name"
						></input>
					</li>
					<li htmlFor="price">
						<label>Price</label>
						<input
							type="text"
							name="price"
							id="price"
							onChange={(e) => setPrice(e.target.value)}
							placeholder="price"
						></input>
					</li>
					<li htmlFor="brand">
						<label>Brand</label>
						<input
							type="text"
							name="brand"
							id="brand"
							onChange={(e) => setBrand(e.target.value)}
							placeholder="brand"
						></input>
					</li>
					<li htmlFor="brand">
						<label>Number of items in Stock</label>
						<input
							type="text"
							name="brand"
							id="brand"
							onChange={(e) => setCountInStock(e.target.value)}
							placeholder="brand"
						></input>
					</li>
					<li htmlFor="category">
						<label>Category</label>
						<input
							type="text"
							name="category"
							id="category"
							onChange={(e) => setCategory(e.target.value)}
							placeholder="category"
						></input>
					</li>
					<li htmlFor="description">
						<label>Description</label>
						<textarea
							type="text"
							name="description"
							id="description"
							onChange={(e) => setDescription(e.target.value)}
							placeholder="name"
						></textarea>
					</li>
					<li>
						<button type="submit" className="button primary ">
							Submit Product
						</button>
					</li>
				</ul>
			</form>
		</div>
	);
}

export default ProductsScreen;
