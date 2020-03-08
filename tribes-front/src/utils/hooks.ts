import {
  useEffect as useEffectBase,
  useRef as useRefBase,
  useState as useStateBase,
} from 'react'

import {
  useParams as useParamsBase,
} from 'react-router-dom'

import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'

import {
  useTranslation as useTranslationBase,
} from 'react-i18next'

import SocketService from '../services/SocketService'

export const useEffect = useEffectBase
export const useRef = useRefBase
export const useState = useStateBase
export const useParams = useParamsBase
export const useDispatch = useDispatchBase
export const useSelector = useSelectorBase
export const useTranslation = useTranslationBase

export const useDispatcher = () => {
  const dispatch = useDispatchBase()
  return (arg: any) => {
    try {
      SocketService.send(dispatch, arg)
    } catch (error) {
      SocketService.close(dispatch)
    }
    return dispatch(arg)
  }

}