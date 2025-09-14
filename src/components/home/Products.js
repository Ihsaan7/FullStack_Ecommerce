import React, {useState, useEffect} from 'react'
import FeaturedProducts from './FeaturedProducts';
import RecentProducts from './RecentProducts';
import ProductBox from './ProductBox';

const Products = () => {

const [products ,setProducts ]=useState([]); 

useEffect(()=>
    {
        fetch("https://fakestoreapi.com/products")
        .then(res=> res.json())
        .then(data=>setProducts(data))
    },[])
  

const recentProducts = products.slice(-12);
const featuredProducts = products
  .filter(product => product.rating.rate > 4)
  .slice(0, 8);

  return (
    <div>
        <FeaturedProducts products={featuredProducts}/>
        <RecentProducts products={recentProducts}/>
    </div>
  )
}

export default Products