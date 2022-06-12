import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h2 className='text-center mt-[15px]'>Statistika</h2>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> İstifadəçilər
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Sifarişlər
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>        
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Qazanc
                </span>
              </div>
              <div className="summary-body">
                
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0} Azn
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2 className='text-center font-bold text-[20px] mt-[15px]'>Satışlar</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>Satış yoxdur, Biznesinizi bağlayın
                </MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2 className='text-center font-bold text-[20px] mt-[15px]'>Kateqoriya</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>Heç bir kateqoriya yoxdur</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
