import React from 'react'

interface ImageProps {
  className?: string,
  alt?: string,
  src: string,
  title?: string
}

const Image = (props: ImageProps) => {
  return (
    <img
      className={`Image${props.className ? ` ${props.className}` : ''}`}
      alt={props.alt}
      src={`http://localhost:3090/${props.src}`}
      title={props.title}
    />
  )
}

export default Image
