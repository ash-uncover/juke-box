import {
  useDispatch
} from 'react-redux'

import SocketService from '../services/SocketService'

export const useDispatcher = () => {
  const dispatch = useDispatch()
  return (arg: any) => {
    try {
      SocketService.send(dispatch, arg)
    } catch (error) {
      SocketService.close(dispatch)
    }
    return dispatch(arg)
  }

}