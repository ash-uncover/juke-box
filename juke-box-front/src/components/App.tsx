import React, { Suspense } from 'react'

import {
  HashRouter as Router
} from 'react-router-dom'

import Tracks from './tracks/Tracks'

import './App.scss'

const tracks = [
  {
    id: 'be-svendsen-getula',
    name: 'Getula',
    artist: 'Be Svendsen',
    album: 'Sol Sahara 2019',
    label: 'Sol Selectas',
    year: '2019',
    tags: ['Techno', 'Melodic House']
  },
  {
    id: 'synapson-mona-ki-ngi-xica',
    name: 'Mona Ki Ngi Xica',
    artist: 'Synapson',
    album: '',
    label: '',
    year: '2013',
    tags: []
  },
  {
    id: 'kurup-joiera',
    name: 'Joeira',
    artist: 'Kurup',
    album: '',
    label: '',
    year: '',
    tags: []
  },
  {
    id: 'nu-man-o-to',
    name: 'Man O To',
    artist: 'Nu',
    album: '',
    label: '',
    year: '',
    tags: []
  },
  {
    id: 'alf-sol',
    name: 'Sol',
    artist: 'Alef',
    album: '',
    label: '',
    year: '',
    tags: []
  }
]


interface AppProps {}

const App = (props: AppProps) => {
  return (
    <Suspense fallback="loading">
      <Router>
        <div className='App'>
          <Tracks tracks={tracks} />
        </div>
      </Router>
    </Suspense>
  )
}

export default App
