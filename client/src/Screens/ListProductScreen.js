import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productActions";
import axios from "axios";

export default function ListProductScreen(props) {
  const [modalVisable, setModalVisable] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productSave = useSelector((state) => state.productSave);

  const productDelete = useSelector((state) => state.productDelete);

  const [uploading, setUploading] = useState(false);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    if (successSave) {
      setModalVisable(false);
    }
    dispatch(listProducts());
    return () => {};
  }, [dispatch, successSave, successDelete]);

  const openModal = (product) => {
    setModalVisable(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setImage(product.image);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        brand,
        image,
        category,
        countInStock,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3> Products </h3>
        <button onClick={() => openModal({})}> Create Product</button>
      </div>

      {modalVisable && (
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                ></input>
              </li>
              <li htmlFor="price">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
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
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="brand"
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li htmlFor="stock">
                <label>Number of items in Stock</label>
                <input
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                  placeholder="Count in Stock"
                ></input>
              </li>
              <li htmlFor="category">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="name"
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary ">
                  {id ? "Update" : "Submit Product"}
                </button>
              </li>
              <li>
                <button
                  type="submit"
                  className="button primary "
                  onClick={() => setModalVisable(false)}
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID </th>
              <th>Name </th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button onClick={() => openModal(product)}> Edit </button>{" "}
                  <button onClick={() => deleteHandler(product)}>
                    {" "}
                    Delete{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
