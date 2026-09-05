import { useEffect, useRef, useState, useCallback } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
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

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

export default function ColombiaMap({ onHover }) {
  const { scene, camera, gl } = useThree()
  const groupRef = useRef()
  const meshesRef = useRef([])
  const hoveredMeshRef = useRef(null)

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
          const name = feature.properties.NOMBRE_DPT

          shapes.forEach(shape => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 0.5,
              bevelEnabled: false,
            })

            const color = new THREE.Color(PALETTE[i % PALETTE.length])
            const material = new THREE.MeshStandardMaterial({
              color,
              roughness: 0.7,
              metalness: 0.15,
            })

            const mesh = new THREE.Mesh(geometry, material)
            mesh.userData = {
              name,
              baseZ: 0,
              targetZ: 0,
              baseColor: color.clone(),
            }

            group.add(mesh)
            meshesRef.current.push(mesh)

            const edgeGeo = new THREE.EdgesGeometry(geometry, 15)
            const edgeMat = new THREE.LineBasicMaterial({
              color: '#000000',
              transparent: true,
              opacity: 0.4,
            })
            mesh.add(new THREE.LineSegments(edgeGeo, edgeMat))
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
      meshesRef.current = []
    }
  }, [scene])

  // Mouse move — detectar hover con raycaster
  useEffect(() => {
    const canvas = gl.domElement

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(meshesRef.current)

      // Resetear el anterior
      if (hoveredMeshRef.current) {
        hoveredMeshRef.current.userData.targetZ = 0
        hoveredMeshRef.current.material.emissive.setHex(0x000000)
      }

      if (hits.length > 0) {
        const mesh = hits[0].object
        mesh.userData.targetZ = 1.2
        mesh.material.emissive.set('#333333')
        hoveredMeshRef.current = mesh
        if (onHover) onHover(mesh.userData.name)
      } else {
        hoveredMeshRef.current = null
        if (onHover) onHover(null)
      }
    }

    canvas.addEventListener('mousemove', onMouseMove)
    return () => canvas.removeEventListener('mousemove', onMouseMove)
  }, [camera, gl, onHover])

  // Animacion suave cada frame
  useFrame(() => {
    meshesRef.current.forEach(mesh => {
      const target = mesh.userData.targetZ || 0
      mesh.position.z += (target - mesh.position.z) * 0.12
    })
  })

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
