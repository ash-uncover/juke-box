import React from 'react'

import {
  Link
} from 'react-router-dom'

import {
  buildClassName
} from '../../utils/ComponentUtils'

import './MainMenuItem.scss'

interface MainMenuItemProps {
  className?: string | string[],
  selected?: boolean,
  to?: string,
  children: any
}

const MainMenuItem = (props: MainMenuItemProps) => {
  let className = `MainMenuItem${props.selected ? ' MainMenuItem-selected' : ''}`
  className = buildClassName(className, props.className)

  if (props.to) {
    return (
      <div
        className={className}
      >
        <Link
          className='MainMenuItem-link MainMenuItem-inner'
          to={props.to}
        >
          {props.children}
        </Link>
      </div>
    )
  }
  return (
    <div
      className={className}
    >
      <div
        className='MainMenuItem-inner'
      >
        {props.children}
      </div>
    </div>
  )
}

export default MainMenuItem
