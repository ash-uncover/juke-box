import React from 'react'

interface ImageProps {
  alt?: string,
  src: string,
  title?: string
}

const Image = (props: ImageProps) => {
  return (
    <img
      className='Image'
      alt={props.alt}
      src={`http://localhost:3090/${props.src}`}
      title={props.title}
    />
  )
}

export default Image
