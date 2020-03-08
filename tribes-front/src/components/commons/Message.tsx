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

export interface MessageActionsProps {
  title: string,
  onClick: any,
  icon: any,
}

export interface MessageProps {
  className?: string | Array<string>,
  time: string,
  user: string,
  text: string,
  actions: Array<MessageActionsProps>,
}

const Message = (props: MessageProps) => {
  return (
    <div
      className={buildClassName('Message', props.className)}
    >
      <div className={`Message-date`}>
        {props.time}
      </div>
      <div className={`Message-user`}>
        {props.user}
      </div>
      <div className={`Message-text`}>
        {props.text}
      </div>
      { props.actions.length ?
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
