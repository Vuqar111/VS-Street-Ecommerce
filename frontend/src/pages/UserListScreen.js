import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../common/actions/userActions";
import { USER_DETAILS_RESET } from "../common/constants/userConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div className="row wnormal">
      <h2>İstifadəçilər</h2>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">İstifadəçi uğurla silindi</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Ad</th>
              <th>Email</th>

              <th>Admindir?</th>
              <th>Aksiya</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>{user.isAdmin ? "Bəli" : "Xeyr"}</td>
                <td>
                  <button
                    type="button"
                    className="bg-[#08AD76] text-[white] p-[1rem]"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Redaktə
                  </button>
                  <button
                    type="button"
                    className="bg-[red] text-[white] p-[1rem]"
                    onClick={() => deleteHandler(user)}
                  >
                    Təmizlə
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
