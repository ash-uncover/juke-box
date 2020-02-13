import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { restTribesDataSelector, restTribesStatusSelector } from '../../store/rest/tribes/selectors'

import { Tribe, User } from '../../types'
import { RequestState } from '../../utils/constants'
import RestService from '../../services/RestService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThList, faTh, faThLarge } from '@fortawesome/free-solid-svg-icons'

import './Tribes.scss'

/* TRIBES */

interface TribesProps {
}

const Tribes = (props: TribesProps) => {
  const dispatch = useDispatch()

  const tribes = useSelector(restTribesDataSelector)
  const status = useSelector(restTribesStatusSelector)

  useEffect(() => {
    if (status === RequestState.NEVER) {
      RestService.rest.tribes.getAll(dispatch, '')
    }
  })

  return (
    <div className='Tribes'>
      { status === RequestState.NEVER && 'Loading...' }
      { status === RequestState.FETCHING && 'Loading...' }
      { status === RequestState.SUCCESS && tribes.map((tribe: any) => tribe.name)}
      { status === RequestState.FAILURE && 'Error' }
    </div>
  )
}

export default Tribes
