import React, {
  useEffect
} from 'react'

import {
  useParams
} from 'react-router-dom'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  restTribeDataSelector,
  restTribeStatusSelector,
  restTribeErrorSelector
} from '../../../store/rest/tribes/selectors'

import {
  RequestState
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import './Tribe.scss'

/* TRIBE */

interface TribeProps {}

const Tribe = (props: TribeProps) => {
  const { tribeId } = useParams()

  const dispatch = useDispatch()

  const tribeData = useSelector(restTribeDataSelector(tribeId || ''))
  const tribeStatus = useSelector(restTribeStatusSelector(tribeId || ''))

  useEffect(() => {
    if (tribeStatus === RequestState.NEVER) {
      RestService.rest.tribes.get(dispatch, tribeId || '')
    }
  })


  return (
    <div className='Tribe'>
      <div className='Tribe-header'>
        {tribeData.name}
      </div>
    </div>
  )
}

export default Tribe
