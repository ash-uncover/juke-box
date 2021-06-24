import React from 'react'

import {
  buildClassName,
} from '../../../utils/ComponentUtils'

import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome'

import'./Button.scss'

interface ButtonProps {
  className?: string | Array<string>,
  title: string,
  icon: any,
  disabled?: boolean,
  type?: 'button' | 'reset' | 'submit',
  color?: string,
  size?: '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x',
  onClick: any
}

const Button = (props: ButtonProps) => {
  const size = props.size || '1x'
  let className = props.className
  if (className) {
    if (typeof className === 'string') {
      className = [className, `ap-button-${size}`]
    } else {
      className = className.concat(`ap-button-${size}`)
    }
  } else {
    className = `ap-button-${size}`
  }
  return (
    <button
      className={buildClassName('ap-button', className)}
      type={props.type || 'button'}
      title={props.title}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <FontAwesomeIcon
        icon={props.icon}
        color={props.color || 'white'}
        size={size}
      />
    </button>
  )
}

export default Button
