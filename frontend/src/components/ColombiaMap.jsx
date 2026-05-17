import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { geoMercator } from 'd3-geo'

export default function ColombiaMap() {
  const { scene } = useThree()
  const groupRef = useRef()

  useEffect(() => {
    fetch('/geo/colombia.geojson')
      .then(r => r.json())
      .then(data => {
        const group = new THREE.Group()

        const projection = geoMercator()
          .center([-74.3, 4.5])
          .scale(1200)
          .translate([0, 0])

        data.features.forEach((feature, i) => {
          const shapes = geoFeatureToShapes(feature, projection)
          shapes.forEach(shape => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 0.3,
              bevelEnabled: false,
            })
            const material = new THREE.MeshStandardMaterial({
              color: new THREE.Color().setHSL(i / 33, 0.6, 0.4),
              roughness: 0.8,
              metalness: 0.1,
            })
            const mesh = new THREE.Mesh(geometry, material)
            group.add(mesh)
          })
        })

        const box = new THREE.Box3().setFromObject(group)
        const center = box.getCenter(new THREE.Vector3())
        group.position.sub(center)
        group.rotation.x = Math.PI

        scene.add(group)
        groupRef.current = group
      })

    return () => {
      if (groupRef.current) scene.remove(groupRef.current)
    }
  }, [scene])

  return null
}

function geoFeatureToShapes(feature, projection) {
  const shapes = []
  const { type, coordinates } = feature.geometry

  const rings = type === 'Polygon'
    ? [coordinates]
    : type === 'MultiPolygon'
    ? coordinates
    : []

  rings.forEach(polygon => {
    polygon.forEach((ring, ringIndex) => {
      const points = ring
        .map(coord => {
          const [x, y] = projection(coord)
          return new THREE.Vector2(x, y)
        })
        .filter(p => isFinite(p.x) && isFinite(p.y))

      if (points.length < 3) return
      if (ringIndex === 0) {
        shapes.push(new THREE.Shape(points))
      }
    })
  })

  return shapes
}
