import {
  useDispatch
} from 'react-redux'

import SocketService from '../services/SocketService'

export const useDispatcher = () => {
  const dispatch = useDispatch()
  return (arg: any) => {
    SocketService.send(arg)
    return dispatch(arg)
  }

}