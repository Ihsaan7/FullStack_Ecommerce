import React from 'react'
import ImageSlider from './ImageSlider'
import Container from '../Container'
import TextSlider from './TextSlider'

const Hero = () => {
  return (
    <Container >
    <div className='flex justify-between mt-10 items-center'>
    <TextSlider/>
    <ImageSlider/>
    </div>
    </Container>
  )
}

export default Hero