import React from 'react'
import Container from '../Container'
import ProductBox from './ProductBox'

const FeaturedProducts = ({products}) => {
  return (
     <Container>
      <h2 className='mt-10 text-2xl font-bold text-center'>Featured Products</h2>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 p-4'>
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
    </Container>
  )
}

export default FeaturedProducts