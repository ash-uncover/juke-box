import React, { useEffect } from 'react'

import {
  useState,
  useRef,
  useTranslation,
} from '../../utils/hooks'

import {
  buildClassName,
} from '../../utils/ComponentUtils'

import {
  Button
} from './'

import'./Message.scss'

export interface MessageActionsProps {
  title: string,
  onClick: any,
  icon: any,
}

export interface MessageProps {
  className?: string,
  time: string,
  user: string,
  text: string,
  isEdit?: boolean,
  showActions?: boolean,
  actions: Array<MessageActionsProps>,
  onCancelEdit: any,
  onValidateEdit: any,
}

const Message = (props: MessageProps) => {
  const { t } = useTranslation()
  const [text, setText] = useState(props.text)
  const [focused, setFocused] = useState(false)

  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!props.isEdit) {
      setText(props.text)
    }
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
      case 'Escape': {
        props.onCancelEdit()
        break
      }
      case 'Enter': {
        props.onValidateEdit(text)
        break
      }
    }
  }

  return (
    <div
      className={buildClassName('Message', props.className, props.isEdit ? 'Message-edit' : null)}
    >
      <div className={`Message-header`}>
        <div className={`Message-date`}>
          {props.time}
        </div>
        <div className={`Message-user`}>
          {props.user}
        </div>
      </div>
      { props.isEdit ?
        <div className={`Message-content`}>
          <input
            className={`Message-input`}
            ref={input}
            value={text}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(event) => setText(event.target.value)}
            onKeyUp={onKeyUp}
          />
          <div className={`Message-footer`}>
            {t('message.footer')}
          </div>
        </div>
      :
        <div className={`Message-text`}>
          {props.text}
        </div>
      }

      { props.showActions && props.actions.length ?
        <div className={`Message-actions`}>
          {props.actions.map((action, index) => (
            <Button
              key={index}
              className={`Message-action`}
              title={action.title}
              onClick={action.onClick}
              icon={action.icon}
              color={'white'}
              size='1x'
            />
          ))}
        </div>
      :
        ''
      }
    </div>
  )
}

export default Message
