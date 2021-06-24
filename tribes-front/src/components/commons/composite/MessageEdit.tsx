import React, { useEffect } from 'react'

import {
  useState,
  useRef,
  useTranslation,
} from '../../../utils/hooks'

import {
  buildClassName,
} from '../../../utils/ComponentUtils'

import {
  Keys,
} from '../../../utils/constants'

import {
  Button
} from '..'

import'./MessageEdit.scss'

export interface MessageEditProps {
  className?: string,
  time: string,
  user: string,
  text: string,
  onCancelEdit: any,
  onValidateEdit: any,
}

const MessageEdit = (props: MessageEditProps) => {
  const { t } = useTranslation()
  const [text, setText] = useState(props.text)
  const [focused, setFocused] = useState(false)

  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (input && input.current) {
      input.current.focus()
    }
  })

  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }

  const onKeyUp = (event: any) => {
    switch (event.key) {
      case Keys.ESCAPE: {
        props.onCancelEdit()
        break
      }
      case Keys.ENTER: {
        props.onValidateEdit(text)
        break
      }
    }
  }

  return (
    <div
      className={buildClassName('ap-message-edit', props.className)}
    >
      <div className={`ap-message-edit-header`}>
        <div className={`ap-message-edit-date`}>
          {props.time}
        </div>
        <div className={`ap-message-edit-user`}>
          {props.user}
        </div>
      </div>
      <div className={`ap-message-edit-content`}>
        <input
          className={`ap-message-edit-input`}
          ref={input}
          value={text}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(event) => setText(event.target.value)}
          onKeyUp={onKeyUp}
        />
        <div className={`ap-message-edit-footer`}>
          {t('message.footer')}
        </div>
      </div>
    </div>
  )
}

export default MessageEdit
