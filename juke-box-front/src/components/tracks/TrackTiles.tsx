import React from 'react'

import { Track } from '../../types'

import './TrackTiles.scss'

/* TRACK TILES */

interface TrackTilesProps {
  tracks: Array<Track>,
  large: boolean
}

const TrackTiles = (props: TrackTilesProps) => {

  const itemsPerRow = props.large ? 3 : 5
  const trackRows = props.tracks.reduce((acc: Array<Array<Track>>, track) => {
    if (acc.length === 0 || acc[acc.length - 1].length === itemsPerRow) {
      acc.push([])
    }
    acc[acc.length - 1].push(track)
    return acc
  }, [])

  return (
    <div className='TrackTiles'>
      { trackRows.map((trackRow: Array<Track>, rowIndex: number) => {
        return (
          <div key={rowIndex} className='TrackTilesRow'>
            { trackRow.map((track: Track, colIndex: number) => (
              <TrackTile
                key={track.id}
                colIndex={colIndex}
                rowIndex={rowIndex}
                {...track}
              />
            ))}
          </div>
        )

      })}
    </div>
  )
}

/* TRACK TILE */

interface TrackTileProps extends Track {
  colIndex: number,
  rowIndex: number
}

export const TrackTile = (props: TrackTileProps) => {

  return (
    <div className='TrackTile' >
      { props.name }
    </div>
  )
}

export default TrackTiles
