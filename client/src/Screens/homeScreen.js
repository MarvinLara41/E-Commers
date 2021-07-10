import React, { useEffect } from "react";

/**Redux */
import { useDispatch, useSelector } from "react-redux";

/*Components */
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { listProducts } from "../actions/productActions";

export default function HomeScreen() {
  const productList = useSelector((state) => state.productList);

  const dispatch = useDispatch();

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
