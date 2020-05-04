import React from 'react'

import './BusyBubbles.scss'

const BusyBubbles = () => {
  return (
    <div className='ap-busy-bubbles'>
      <div className='ap-busy-bubble ap-busy-bubble-1' />
      <div className='ap-busy-bubble ap-busy-bubble-2' />
      <div className='ap-busy-bubble ap-busy-bubble-3' />
      <div className='hidden-container' />
    </div>
  )
}

export default BusyBubbles
