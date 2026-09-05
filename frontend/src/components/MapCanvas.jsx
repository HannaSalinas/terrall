import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ColombiaMap from './ColombiaMap'

export default function MapCanvas() {
  const [hoveredDept, setHoveredDept] = useState(null)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {hoveredDept && (
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          color: '#ffffff',
          padding: '8px 20px',
          borderRadius: '20px',
          fontSize: '14px',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          {hoveredDept}
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[8, 12, 8]} intensity={1.5} />
        <directionalLight position={[-8, -4, -4]} intensity={0.2} color='#4488ff' />
        <ColombiaMap onHover={setHoveredDept} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
