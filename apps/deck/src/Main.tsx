import { ViewStateChangeParameters } from '@deck.gl/core/typed/controllers/controller'
import { Tile3DLayer, Tile3DLayerProps } from '@deck.gl/geo-layers/typed'
import DeckGL from '@deck.gl/react/typed'
import { Tiles3DLoader } from '@loaders.gl/3d-tiles'
import { Tile3D } from '@loaders.gl/tiles'
import maplibre from 'maplibre-gl'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { Map } from 'react-map-gl'

import { lightingEffect } from './lightingEffect'

import 'maplibre-gl/dist/maplibre-gl.css'

function overrideMaterial(tile: Tile3D): void {
  if (tile.content.gltf.materials.length > 0) {
    const [material] = tile.content.gltf.materials
    material.pbrMetallicRoughness.metallicFactor = 0
    material.pbrMetallicRoughness.roughnessFactor = 1
  }
}

const layerProps: Partial<Tile3DLayerProps> = {
  loader: Tiles3DLoader,
  onTileLoad: tile => {
    overrideMaterial(tile)
  }
}

const layers = [
  new Tile3DLayer({
    ...layerProps,
    id: '13101',
    data: 'https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13101_chiyoda-ku/notexture/tileset.json'
  }),
  new Tile3DLayer({
    ...layerProps,
    id: '13102',
    data: 'https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13102_chuo-ku/notexture/tileset.json'
  })
]

export const Main: NextPage = () => {
  const [viewState, setViewState] = useState({
    // Coordinates of Tokyo station.
    longitude: 139.7671,
    latitude: 35.6812,
    zoom: 14
  })

  const handleViewStateChange = useCallback(
    (event: ViewStateChangeParameters) => {
      setViewState(event.viewState as typeof viewState)
    },
    []
  )

  return (
    <DeckGL
      controller
      layers={[layers]}
      effects={[lightingEffect]}
      initialViewState={viewState}
      onViewStateChange={handleViewStateChange}
    >
      <Map
        // @ts-expect-error Assertion
        mapLib={maplibre}
        mapStyle='https://tile.openstreetmap.jp/styles/osm-bright/style.json'
      />
    </DeckGL>
  )
}
