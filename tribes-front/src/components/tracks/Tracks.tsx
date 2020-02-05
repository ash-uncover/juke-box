import React, { useState } from 'react'

import { Track } from '../../types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThList, faTh, faThLarge } from '@fortawesome/free-solid-svg-icons'
import TrackTable from './TrackTable'
import TrackTiles from './TrackTiles'

import './Tracks.scss'

const DISPLAY_MODES = {
  TABLE: 'table',
  TILES: 'tiles',
  TILES_LG: 'tiles-lg'
}

/* TRACKS */

interface TracksProps {
  tracks: Array<Track>
}

const renderMode = (mode: string, tracks: Array<Track>) => {
  switch (mode) {
    case DISPLAY_MODES.TILES: {
      return <TrackTiles tracks={tracks} large={false} />
    }
    case DISPLAY_MODES.TILES_LG: {
      return <TrackTiles tracks={tracks} large={true} />
    }
    case DISPLAY_MODES.TABLE: {
      return <TrackTable tracks={tracks} />
    }
  }
  return null
}

const Tracks = (props: TracksProps) => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.TILES_LG)

  return (
    <div className='Tracks'>
      <div className='Tracks-displayModeSelector'>
        <TracksDiplayModeSelectorButton
          icon={faThLarge}
          selected={displayMode === DISPLAY_MODES.TILES_LG}
          onSelected={() => setDisplayMode(DISPLAY_MODES.TILES_LG)}
        />
        <TracksDiplayModeSelectorButton
          icon={faTh}
          selected={displayMode === DISPLAY_MODES.TILES}
          onSelected={() => setDisplayMode(DISPLAY_MODES.TILES)}
        />
        <TracksDiplayModeSelectorButton
          icon={faThList}
          selected={displayMode === DISPLAY_MODES.TABLE}
          onSelected={() => setDisplayMode(DISPLAY_MODES.TABLE)}
        />
      </div>
      { renderMode(displayMode, props.tracks) }
    </div>
  )
}

/* TRACKS DISPLAY MODE SELECTOR BUTTON */

interface TracksDiplayModeSelectorButtonProps {
  selected: boolean,
  onSelected: any,
  icon: any
}

const TracksDiplayModeSelectorButton = (props: TracksDiplayModeSelectorButtonProps) => {

  return (
    <button
      className={`TracksDiplayModeSelectorButton${props.selected ? ' TracksDiplayModeSelectorButton-selected' : ''}`}
      onClick={props.onSelected}
    >
      <FontAwesomeIcon
        icon={props.icon}
        color={props.selected ? 'grey' : 'darkgrey'}
      />
    </button>
  )
}


export default Tracks
