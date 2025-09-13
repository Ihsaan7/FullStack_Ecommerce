import React from 'react'
import ImageSlider from './ImageSlider'
import Container from '../Container'
import TextSlider from './TextSlider'

const Hero = () => {
  return (
    <Container >
    <div className='flex'>
    <TextSlider/>
    <ImageSlider/>
    </div>
    </Container>
  )
}

export default Hero