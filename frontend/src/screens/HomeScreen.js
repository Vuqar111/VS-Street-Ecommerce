import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import FeaturedContent from '../components/FeaturedContent';
import PopularCategories from '../components/PopularCategories';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;


  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  console.log(products);  
  return (
    <div >
      <HeroSection/>
     <FeaturedContent/>
     <PopularCategories/>
      <div className='home'>
      <h2 className='populartitle'><span className='clipspan'>Popular</span> Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <h1>
          f
        </h1>
        // <>
        //   {products.length === 0 && <MessageBox>İstəyinizə uyğun məhsul tapılmadı</MessageBox>}
        //   <div className="homeproducts">
        //     {products.slice(0,3).map((product) => (
        //       <Product key={product._id} product={product}></Product>
        //     ))}
        //   </div>
        // </>
      )}
      </div>
      <Features/>
    </div>
  );
}
