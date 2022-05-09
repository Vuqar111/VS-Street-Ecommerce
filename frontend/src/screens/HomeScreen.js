import React, {useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HeroSection from '../components/HeroSection';
import { listCoupons } from "../actions/couponActions";
import Features from '../components/Features';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import FeaturedContent from '../components/FeaturedContent';
import PopularCategories from '../components/PopularCategories';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const couponList = useSelector((state) => state.couponList);
  const { coupons } = couponList;
  

  
  
  // const [cops, setCops] = useState([]);
  
  // const getCops = () => {
  //   fetch('http://localhost:9000/api/coupons')
  //     .then(res => res.json())
  //     .then(data => setCops(data))
  //     .catch(err => console.log(err));
  // }

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listCoupons({}));
  }, [dispatch]);

  console.log(coupons);  
  return (
    <div >
      <HeroSection/>
     <FeaturedContent/>
     <PopularCategories/>
      <div className='home'>
      <h2 className='populartitle'><span className='clipspan'>Məşhur</span>Məhsullar</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>İstəyinizə uyğun məhsul tapılmadı</MessageBox>}
          <div className="homeproducts">
            {products.slice(0,3).map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
      </div>
      <Features/>
    </div>
  );
}
