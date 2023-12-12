import { Ellipsoid } from '@math.gl/geospatial'
import { FC, ReactNode, useMemo } from 'react'
import { Matrix4, Quaternion } from 'three'

export const EastNorthUp: FC<{
  longitude: number
  latitude: number
  children?: ReactNode
}> = ({ longitude, latitude, children }) => {
  const position = useMemo(
    () => Ellipsoid.WGS84.cartographicToCartesian([longitude, latitude, 0]),
    [longitude, latitude]
  )

  const quaternion = useMemo(
    () =>
      new Quaternion().setFromRotationMatrix(
        new Matrix4().fromArray(
          Ellipsoid.WGS84.eastNorthUpToFixedFrame(position).getRotation()
        )
      ),
    [position]
  )

  return (
    <group
      position={position as [number, number, number]}
      quaternion={quaternion}
    >
      {children}
    </group>
  )
}
