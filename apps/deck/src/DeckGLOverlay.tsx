import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed'
import { FC } from 'react'
import { useControl } from 'react-map-gl'

export const DeckGLOverlay: FC<
  MapboxOverlayProps & {
    interleaved?: boolean
  }
> = props => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}
