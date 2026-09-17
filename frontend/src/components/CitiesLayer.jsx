import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { projection } from './ColombiaMap'
import { CITIES } from '../data/cities'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

export default function CitiesLayer({ onCityHover, offset }) {
  const { scene, camera, gl } = useThree()
  const markersRef = useRef([])
  const hoveredRef = useRef(null)
  const groupRef = useRef()

  useEffect(() => {
    if (!offset) return

    // Limpiar grupo anterior si existe
    if (groupRef.current) {
      scene.remove(groupRef.current)
      disposeGroup(groupRef.current)
      markersRef.current = []
    }

    const group = new THREE.Group()

    CITIES.forEach(city => {
      const [px, py] = projection([city.lng, city.lat])

      // Aplicar mismo offset que ColombiaMap
      const x = px + offset.x
      const y = -(py) + offset.y

      const geo = new THREE.SphereGeometry(0.1, 16, 16)
      const mat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ffdd00',
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.4,
      })
      const marker = new THREE.Mesh(geo, mat)
      marker.position.set(x, y, 1.0)
      marker.userData = { city }
      group.add(marker)
      markersRef.current.push(marker)

      const ringGeo = new THREE.RingGeometry(0.14, 0.19, 32)
      const ringMat = new THREE.MeshBasicMaterial({
        color: '#ffdd00',
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.set(x, y, 0.95)
      group.add(ring)
    })

    scene.add(group)
    groupRef.current = group

    return () => {
      scene.remove(group)
      disposeGroup(group)
      markersRef.current = []
    }
  }, [scene, offset])

  useEffect(() => {
    const canvas = gl.domElement
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(markersRef.current, false)
      if (hoveredRef.current) {
        hoveredRef.current.material.emissiveIntensity = 0.8
        hoveredRef.current.scale.setScalar(1)
      }
      if (hits.length > 0) {
        const marker = hits[0].object
        marker.material.emissiveIntensity = 2
        marker.scale.setScalar(1.8)
        hoveredRef.current = marker
        if (onCityHover) onCityHover(marker.userData.city)
      } else {
        hoveredRef.current = null
        if (onCityHover) onCityHover(null)
      }
    }
    canvas.addEventListener('mousemove', onMouseMove)
    return () => canvas.removeEventListener('mousemove', onMouseMove)
  }, [camera, gl, onCityHover])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      if (child.geometry?.type === 'RingGeometry') {
        child.material.opacity = 0.3 + Math.sin(t * 2 + i) * 0.2
        const s = 1 + Math.sin(t * 2 + i) * 0.1
        child.scale.setScalar(s)
      }
    })
  })

  return null
}

function disposeGroup(group) {
  group.traverse(obj => {
    obj.geometry?.dispose()
    obj.material?.dispose()
  })
}
