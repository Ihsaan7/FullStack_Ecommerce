import React from 'react'
import Container from '../Container'
import CategoryBox from './CategoryBox'

const CategoriesList = ({categories}) => {
  return (
    <Container>
<div className="bg-gray-50 p-4 rounded-lg h-fit sticky top-4">
  <h3 className="text-xl font-semibold mb-4 text-gray-800">Categories</h3>
  <div className="space-y-2">
    {categories.map((category, index) => (
      <CategoryBox key={index} category={category} />
    ))}
  </div>
</div>
    </Container>
  )
}

export default CategoriesList