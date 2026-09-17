import { useEffect, useRef } from 'react'
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

const EDGE_COLOR = '#000000'
const EDGE_COLOR_SELECTED = '#ffd700'
const EMISSIVE_HOVER = '#333333'
const EMISSIVE_SELECTED = '#664400'
const EMISSIVE_NONE = '#000000'

export const projection = geoMercator()
  .center([-74.3, 4.5])
  .scale(1200)
  .translate([0, 0])

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

export default function ColombiaMap({ onHover, onOffsetReady, onSelect, selectedDept }) {
  const { scene, camera, gl } = useThree()
  const groupRef = useRef()
  const meshesRef = useRef([])
  const hoveredMeshRef = useRef(null)
  const selectedDeptRef = useRef(selectedDept)

  useEffect(() => {
    selectedDeptRef.current = selectedDept
    meshesRef.current.forEach(mesh => applyMeshStyle(mesh, hoveredMeshRef.current, selectedDept))
  }, [selectedDept])

  useEffect(() => {
    fetch('/geo/colombia.geojson')
      .then(r => r.json())
      .then(data => {
        const group = new THREE.Group()

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
            mesh.userData = { name, targetZ: 0, baseColor: color.clone() }
            group.add(mesh)
            meshesRef.current.push(mesh)

            const edgeGeo = new THREE.EdgesGeometry(geometry, 15)
            const edgeMat = new THREE.LineBasicMaterial({
              color: EDGE_COLOR, transparent: true, opacity: 0.4,
            })
            mesh.userData.edgeMaterial = edgeMat
            mesh.add(new THREE.LineSegments(edgeGeo, edgeMat))

            applyMeshStyle(mesh, null, selectedDeptRef.current)
          })
        })

        const box = new THREE.Box3().setFromObject(group)
        const center = box.getCenter(new THREE.Vector3())
        group.position.sub(center)
        group.rotation.x = Math.PI

        scene.add(group)
        groupRef.current = group

        // Pasar el offset calculado a CitiesLayer
        if (onOffsetReady) onOffsetReady({ x: -center.x, y: -center.y })
      })

    return () => {
      if (groupRef.current) scene.remove(groupRef.current)
      meshesRef.current = []
    }
  }, [scene, onOffsetReady])

  useEffect(() => {
    const canvas = gl.domElement

    const getHit = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(meshesRef.current, false)
      return hits.length > 0 ? hits[0].object : null
    }

    const onMouseMove = (e) => {
      const mesh = getHit(e)
      if (hoveredMeshRef.current && hoveredMeshRef.current !== mesh) {
        applyMeshStyle(hoveredMeshRef.current, null, selectedDeptRef.current)
      }
      if (mesh) {
        hoveredMeshRef.current = mesh
        applyMeshStyle(mesh, mesh, selectedDeptRef.current)
        if (onHover) onHover(mesh.userData.name)
      } else {
        hoveredMeshRef.current = null
        if (onHover) onHover(null)
      }
    }

    const onClick = (e) => {
      const mesh = getHit(e)
      if (!mesh) return
      const name = mesh.userData.name
      if (onSelect) onSelect(name === selectedDeptRef.current ? null : name)
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('click', onClick)
    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('click', onClick)
    }
  }, [camera, gl, onHover, onSelect])

  useFrame(() => {
    meshesRef.current.forEach(mesh => {
      const target = mesh.userData.targetZ || 0
      mesh.position.z += (target - mesh.position.z) * 0.12
    })
  })

  return null
}

function applyMeshStyle(mesh, hoveredMesh, selectedDept) {
  const isSelected = mesh.userData.name === selectedDept
  const isHovered = mesh === hoveredMesh

  mesh.userData.targetZ = isHovered ? 1.2 : 0
  mesh.userData.edgeMaterial.color.set(isSelected ? EDGE_COLOR_SELECTED : EDGE_COLOR)
  mesh.userData.edgeMaterial.opacity = isSelected ? 0.9 : 0.4

  if (isSelected) {
    mesh.material.emissive.set(EMISSIVE_SELECTED)
  } else if (isHovered) {
    mesh.material.emissive.set(EMISSIVE_HOVER)
  } else {
    mesh.material.emissive.set(EMISSIVE_NONE)
  }
}

function geoFeatureToShapes(feature, projection) {
  const shapes = []
  const { type, coordinates } = feature.geometry
  const rings = type === 'Polygon' ? [coordinates] : type === 'MultiPolygon' ? coordinates : []
  rings.forEach(polygon => {
    polygon.forEach((ring, ringIndex) => {
      const points = ring
        .map(coord => { const [x, y] = projection(coord); return new THREE.Vector2(x, y) })
        .filter(p => isFinite(p.x) && isFinite(p.y))
      if (points.length < 3) return
      if (ringIndex === 0) shapes.push(new THREE.Shape(points))
    })
  })
  return shapes
}
