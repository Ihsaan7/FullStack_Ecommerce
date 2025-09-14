import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import CategoriesList from '../components/store/CategoriesList'
import ProductsList from '../components/store/ProductsList'

const Store = () => {
  const [products , setProducts] = useState([])
  const [categories , setCategories] = useState([])

  useEffect(()=>{
      const fetchData = async ()=>
        {
          const [productsRes , categoriesRes] = await Promise.all([
            fetch("https://fakestoreapi.com/products"),
            fetch("https://fakestoreapi.com/products/categories")
          ])

          const productsData = await productsRes.json();
          const categoriesData = await categoriesRes.json();

          setProducts(productsData)
          setCategories(categoriesData)
        }
        fetchData()
  },[])

const categoryList = categories.slice(-5)
const productList = products.slice(-30)

  return (
    <Container>
  <div className="py-8">
    <h1 className="text-3xl font-bold text-center mb-8">Everything, All you need at one place</h1>
    <div className="flex gap-6">
      <div className="w-1/4 min-w-[250px]">
        <CategoriesList categories={categoryList} />
      </div>
      <div className="flex-1">
        <ProductsList products={productList} />
      </div>
    </div>
  </div>
</Container>
  )
}

export default Store