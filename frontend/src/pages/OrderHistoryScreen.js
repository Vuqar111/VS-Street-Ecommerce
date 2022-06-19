import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../common/actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div className='row p-[0px] wnormal'>
      <h2>Sifarişlərim</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Sifariş kodu</th>
              <th>Tarix</th>
              <th>Məbləğ</th>
            
              <th>Aksiya</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                {/* <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Ödənilməyib'}</td> */}
                {/* <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'Yoldadır'}
                </td> */}
                <td>
                  <button
                    type="button"
                    className="bg-[#08AD76] text-[white] p-[1rem]"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Detallı
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
