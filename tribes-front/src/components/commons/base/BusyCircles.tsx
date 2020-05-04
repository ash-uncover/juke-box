import React from 'react'

import './BusyCircles.scss'

const BusyCircles = () => {
  return (
    <div className='ap-busy-circles'>
      <div className='hidden-container' />
      <div className='ap-busy-circles-container'>
        <div className='ap-busy-circle ap-busy-circle-1' />
        <div className='ap-busy-circle ap-busy-circle-2' />
        <div className='ap-busy-circle ap-busy-circle-3' />
        <div className='ap-busy-circle ap-busy-circle-4' />
        <div className='ap-busy-circle ap-busy-circle-5' />
        <div className='ap-busy-circle ap-busy-circle-6' />
        <div className='ap-busy-circle ap-busy-circle-7' />
        <div className='ap-busy-circle ap-busy-circle-8' />
      </div>
    </div>
  )
}

export default BusyCircles
