import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { geoMercator } from 'd3-geo'

const PALETTE = [
  '#2d6a4f', '#40916c', '#52b788', '#74c69d',
  '#1e6091', '#1a759f', '#168aad', '#34a0a4',
  '#b5838d', '#c9ada7', '#e07a5f', '#f2cc8f',
  '#3d405b', '#81b29a', '#f4a261', '#264653',
  '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51',
  '#606c38', '#dda15e', '#bc6c25', '#283618',
  '#480ca8', '#7209b7', '#3a0ca3', '#4361ee',
  '#4cc9f0', '#f72585', '#b5179e', '#560bad',
  '#023e8a',
]

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
              depth: 0.5,
              bevelEnabled: false,
            })
            const material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(PALETTE[i % PALETTE.length]),
              roughness: 0.7,
              metalness: 0.15,
            })
            const mesh = new THREE.Mesh(geometry, material)
            group.add(mesh)

            const edgeGeo = new THREE.EdgesGeometry(geometry, 15)
            const edgeMat = new THREE.LineBasicMaterial({
              color: '#000000',
              transparent: true,
              opacity: 0.4,
            })
            const edges = new THREE.LineSegments(edgeGeo, edgeMat)
            mesh.add(edges)
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
  const rings = type === 'Polygon' ? [coordinates] : type === 'MultiPolygon' ? coordinates : []

  rings.forEach(polygon => {
    polygon.forEach((ring, ringIndex) => {
      const points = ring
        .map(coord => {
          const [x, y] = projection(coord)
          return new THREE.Vector2(x, y)
        })
        .filter(p => isFinite(p.x) && isFinite(p.y))
      if (points.length < 3) return
      if (ringIndex === 0) shapes.push(new THREE.Shape(points))
    })
  })

  return shapes
}
