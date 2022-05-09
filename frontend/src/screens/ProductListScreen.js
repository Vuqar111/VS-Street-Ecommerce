import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
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
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
    );
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div className="row">
      <div className="w-[100%] flex justify-between items-center">
        <h1 className="font-bold text-[30px]">Məhsullar</h1>
        <button type="button" className="bg-[#08AD76] text-[white] p-[1rem]" onClick={createHandler}>
         Məhsul Yarat
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Ad</th>
                <th>Qiymət</th>
                <th>Kateqoriya</th>
                <th>Brand</th>
                <th>Aksiya</th>
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
                    <button
                      type="button"
                      className="bg-[#08AD76] text-[white] p-[1rem]"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Redaktə Et
                    </button>
                    <button
                      type="button"
                      className="bg-[red] text-[white] p-[1rem]"
                      onClick={() => deleteHandler(product)}
                    >
                    Təmizlə
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <div className="pagdiv">
                <Link
                  className={x + 1 === page ? "active" : ""}
                  key={x + 1}
                  to={`/productlist/pageNumber/${x + 1}`}
                >
                  {x + 1}
                </Link>
              </div>
            ))}
          </div> */}
        </>
      )}
    </div>
  );
}
