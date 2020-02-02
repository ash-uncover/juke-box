import { Reducer } from 'redux'
import { Track } from '../../types'

export interface DataState {
  tracks: Array<Track>
}

export const initialState: DataState = {
  tracks: [
    {
      id: 'be-svendsen-getula',
      name: 'Getula',
      artist: 'Be Svendsen',
      album: 'Sol Sahara 2019',
      label: 'Sol Selectas',
      year: '2019'
    },
    {
      id: 'synapson-mona-ki-ngi-xica',
      name: 'Mona Ki Ngi Xica',
      artist: 'Synapson',
      album: '',
      label: '',
      year: '2013'
    },
    {
      id: 'kurup-joiera',
      name: 'Joeira',
      artist: 'Kurup',
      album: '',
      label: '',
      year: ''
    },
    {
      id: 'nu-man-o-to',
      name: 'Man O To',
      artist: 'Nu',
      album: '',
      label: '',
      year: ''
    },
    {
      id: 'alf-sol',
      name: 'Sol',
      artist: 'Alef',
      album: '',
      label: '',
      year: ''
    }
  ]
}

const reducer: Reducer<DataState> = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default reducer