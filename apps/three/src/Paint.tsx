import { Line } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { atom, useAtom } from 'jotai'
import { FC, useContext, useMemo } from 'react'
import { Raycaster, Vector3 } from 'three'

import { EastNorthUpContext } from './EastNorthUp'

const raycaster = new Raycaster()

const pointsAtom = atom<Vector3[]>([])

export const Paint: FC = () => {
  const scene = useThree(({ scene }) => scene)
  const camera = useThree(({ camera }) => camera)

  const matrix = useContext(EastNorthUpContext)
  const inverseMatrix = useMemo(() => matrix?.clone()?.invert(), [matrix])

  const [points, setPoints] = useAtom(pointsAtom)

  useFrame(state => {
    if (inverseMatrix == null) {
      return
    }
    raycaster.setFromCamera(state.pointer, camera)
    const results = raycaster.intersectObject(scene)
    if (results.length === 0) {
      return
    }
    const result = results[0]
    const normal = result.normal
    if (normal == null) {
      return
    }
    setPoints(points => [
      ...points,
      result.point.addScaledVector(normal, 2).applyMatrix4(inverseMatrix)
    ])
  })

  return (
    <>
      {points.length > 1 && (
        <Line points={points} lineWidth={3} color='white' />
      )}
    </>
  )
}
