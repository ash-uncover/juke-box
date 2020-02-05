import React, { useState } from 'react'

import { Track } from '../../types'
import { SortDirections } from '../../utils/constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

import './TrackTable.scss'

/* TRACK TABLE */

interface Column {
  id: keyof TrackTableRowProps,
  name: string,
  width: string
}

interface ColumnSort {
  id: keyof TrackTableRowProps,
  direction: SortDirections,
  userSet: false
}

const COLUMNS: Array<Column> = [
  { id: 'index', name: '#', width: '10%' },
  { id: 'name', name: 'Name', width: '40%' },
  { id: 'artist', name: 'Artist', width: '40%' }
]

interface TrackTableProps {
  tracks: Array<Track>
}

const TrackTable = (props: TrackTableProps) => {
  const [sort, setSort] = useState<ColumnSort>({
    id: 'name',
    direction: SortDirections.NONE,
    userSet: false
  })

  const tracks = props.tracks.map((track, index) => {
    return { ...track, index: index + 1 }
  }).sort((track1, track2) => {
    if (sort.id) {
      const { id, direction } = sort
      if (direction === SortDirections.ASCENDING) {
        return track2[id] < track1[id] ? 1 : -1
      }
      if (direction === SortDirections.DESCENDING) {
        return track2[id] > track1[id] ? 1 : -1
      }
    }
    return 1
  })

  return (
    <div className='TrackTable'>
      <TrackTableHeader currentSort={sort} onSortChange={setSort} />
      { tracks.map((track) => {
        return (
          <TrackTableRow key={track.id} {...track} />
        )
      }) }
    </div>
  )
}

/* TRACK TABLE HEADER */

interface TrackTableHeaderProps {
  currentSort: ColumnSort,
  onSortChange: any
}

export const TrackTableHeader = (props: TrackTableHeaderProps) => {

  return (
    <div className='TrackTableHeader'>
      { COLUMNS.map((column) => {
        const isSortUp = column.id === props.currentSort.id && props.currentSort.direction === SortDirections.DESCENDING
        const isSortDown = column.id === props.currentSort.id && props.currentSort.direction === SortDirections.ASCENDING

        const onClick = () => {
          if (isSortDown) {
            props.onSortChange({ id: column.id, direction: SortDirections.DESCENDING, userSet: true })
          } else if (isSortUp) {
            props.onSortChange({ id: 'index', direction: SortDirections.NONE, userSet: false })
          } else {
            props.onSortChange({ id: column.id, direction: SortDirections.ASCENDING, userSet: true })
          }
        }

        return (
          <div
            key={column.id}
            className='TrackTableHeaderCell'
            style={{ width: column.width }}
            onClick={onClick}
          >
            <div className='TrackTableHeaderCellSort'>
              <div className={`TrackTableHeaderCellSortButton${isSortUp ? ' TrackTableHeaderCellSortButton-active' : ''}`}>
                <FontAwesomeIcon icon={faSortUp} />
              </div>
              <div className={`TrackTableHeaderCellSortButton${isSortDown ? ' TrackTableHeaderCellSortButton-active' : ''}`}>
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </div>
            <div className={`TrackTableHeaderCellTitle${props.currentSort.userSet && (isSortDown || isSortUp) ? ' TrackTableHeaderCellTitle-active' : ''}`}>
              { column.name }
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* TRACK TABLE ROW */

interface TrackTableRowProps extends Track {
  index: number
}

export const TrackTableRow = (props: TrackTableRowProps) => {

  return (
    <div className='TrackTableRow'>
      { COLUMNS.map((column) => (
        <TrackTableRowCell key={column.id} width={column.width}>
          { props[column.id] }
        </TrackTableRowCell>
      ))}
    </div>
  )
}

/* TRACK TABLE ROW */

interface TrackTableRowCellProps {
  children: any,
  width: string
}

export const TrackTableRowCell = (props: TrackTableRowCellProps) => {

  return (
    <div
      className='TrackTableRowCell'
      style={{ width: props.width }}
    >
      { props.children }
    </div>
  )
}

export default TrackTable
