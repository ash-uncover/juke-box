import React from 'react'

import Image from './Image'

import {
  buildClassName,
} from '../../../utils/ComponentUtils'

import'./Tile.scss'

interface TileProps {
  className?: string | Array<string>,
  name: string,
  image: string,
}

const Tile = (props: TileProps) => {
  return (
    <div
      className={buildClassName('Tile', props.className)}
    >
      <Image
        className={`Tile-image`}
        src={props.image}
      />
      <div
        className={`Tile-title`}
      >
        {props.name}
      </div>
    </div>
  )
}

export default Tile
