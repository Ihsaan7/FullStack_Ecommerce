'use client'
import {useState, useEffect , React} from 'react'


const ProductBox = () => {

const [products , ]=useState([]); 

useEffect(()=>
    {
        fetch("https://fakestoreapi.com/products")
        .then(res=> res.json())
        .then(data=>setProducts(data))
    },[])

const recentProducts = products.slice(-4);
const featuredProducts = products.filter(product=> product.rating.rate > 4)

  return (
    <div>
        
    </div>
  )
}

export default ProductBox