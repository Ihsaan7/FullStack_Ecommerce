import React from 'react'
import Container from '../Container'
import ProductBox from '../home/ProductBox'

const ProductsList = ({products}) => {
  return (
   <Container>
  <div>
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
          <ProductBox
            key={product.id} 
            name={product.title}
            price={product.price}
            image={product.image}
            category={product.category} 
          />
          
        ))}
    </div>
      </div>
    </Container>
  )
}

export default ProductsList