import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ColombiaMap from './ColombiaMap'
import CitiesLayer from './CitiesLayer'
import SidePanel from './SidePanel'

export default function MapCanvas() {
  const [hoveredDept, setHoveredDept] = useState(null)
  const [hoveredCity, setHoveredCity] = useState(null)
  const [mapOffset, setMapOffset] = useState(null)
  const [selectedDept, setSelectedDept] = useState(null)

  const label = hoveredCity ? hoveredCity.name : hoveredDept

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {!mapOffset && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.6)',
          fontFamily: 'monospace',
          fontSize: '13px',
          letterSpacing: '0.1em',
          zIndex: 30,
          pointerEvents: 'none',
        }}>
          CARGANDO MAPA...
        </div>
      )}
      {label && (
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: hoveredCity ? 'rgba(255,200,0,0.15)' : 'rgba(0,0,0,0.7)',
          border: hoveredCity ? '1px solid rgba(255,200,0,0.6)' : 'none',
          color: hoveredCity ? '#ffdd00' : '#ffffff',
          padding: '8px 20px',
          borderRadius: '20px',
          fontSize: '14px',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          {hoveredCity
            ? hoveredCity.name + ' · ' + (hoveredCity.population / 1000000).toFixed(1) + 'M hab'
            : label
          }
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[8, 12, 8]} intensity={1.5} />
        <directionalLight position={[-8, -4, -4]} intensity={0.2} color='#4488ff' />
        <ColombiaMap
          onHover={setHoveredDept}
          onOffsetReady={setMapOffset}
          onSelect={setSelectedDept}
          selectedDept={selectedDept}
        />
        <CitiesLayer onCityHover={setHoveredCity} offset={mapOffset} />
        <OrbitControls />
      </Canvas>
      <SidePanel department={selectedDept} onClose={() => setSelectedDept(null)} />
    </div>
  )
}
