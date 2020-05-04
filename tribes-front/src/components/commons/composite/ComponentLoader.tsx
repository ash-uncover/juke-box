import React from 'react'

import {
  RequestState,
} from '../../../utils/constants'

import './ComponentLoader.scss'

interface ComponentLoaderProps {
  className: string,
  status: RequestState,
  children: any,
}

const ComponentLoader = (props: ComponentLoaderProps) => {
  const {
    className,
    status,
  } = props

  switch (status) {
    case RequestState.NEVER:
    case RequestState.FETCHING_FIRST: {
      return (
        <div className={className}>
          Loading...
        </div>
      )
    }
    case RequestState.FETCHING:
    case RequestState.SUCCESS: {
      return props.children
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div className={className}>
          Error ProfileThreadMessage
        </div>
      )
    }
  }
}

export default ComponentLoader
