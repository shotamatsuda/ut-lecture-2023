import { Line } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { atom, useAtom } from 'jotai'
import { FC, useContext, useMemo } from 'react'
import { Raycaster, Vector3 } from 'three'

import { EastNorthUpContext } from './EastNorthUp'

const pointsAtom = atom<Vector3[]>([])

export const Paint: FC = () => {
  const scene = useThree(state => state.scene)
  const camera = useThree(state => state.camera)

  const [points, setPoints] = useAtom(pointsAtom)
  const matrix = useContext(EastNorthUpContext)
  const invertedMatrix = useMemo(() => matrix?.invert(), [matrix])

  useFrame(state => {
    if (invertedMatrix == null) {
      return
    }
    const raycaster = new Raycaster()
    raycaster.setFromCamera(state.pointer, camera)
    const results = raycaster.intersectObject(scene)
    if (results.length > 0) {
      const normal = results[0].normal
      if (normal == null) {
        return
      }
      setPoints(points => [
        ...points,
        results[0].point.applyMatrix4(invertedMatrix).addScaledVector(normal, 2)
      ])
    }
  })

  return (
    <>
      {points.length > 1 && (
        <Line points={points} lineWidth={3} color='white' />
      )}
    </>
  )
}
