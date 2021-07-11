import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  saveProduct,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_SAVE_RESET,
} from "../constants/productConstants";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productSave);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalVisable, setModalVisable] = useState(false);

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_SAVE_RESET });
      setModalVisable(false);
      props.history.push(`/products`);
    }

    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      props.history.push("/products");
    }

    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  /******************* Handlers   ***********************************/
  const deleteHandler = (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
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

  return (
    <div>
      <div className="row">
        <button onClick={() => openModal({})}> Create Product</button>
      </div>
      {modalVisable && (
        <div className="form">
          <form onSubmit={createHandler}>
            <ul className="form-container">
              <li>
                <h3> Create a Product</h3>
              </li>
              <li>
                {loadingCreate && <div> Loading... </div>}
                {errorCreate && <div> {errorCreate} </div>}
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
                  value={countInStock}
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
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      <div>
        <h1>Currently listed product</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Quanity</th>
                <th>Actions</th>
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
                  <td>{product.countInStock}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
