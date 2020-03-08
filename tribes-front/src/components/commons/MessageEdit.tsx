import React from 'react'

import {
  useState,
} from '../../utils/hooks'

import {
  buildClassName,
} from '../../utils/ComponentUtils'

import {
  Button
} from './'

import'./Message.scss'

export interface MessageEditProps {
  className?: string | Array<string>,
  baseText: string,
  onCancel: any,
  onValidate: any,
}

const Message = (props: MessageEditProps) => {
  const [text, setText] = useState(props.baseText)

  return (
    <div
      className={buildClassName('MessageEdit', props.className)}
    >
      <input
        className={`MessageEdit-input`}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </div>
  )
}

export default Message
