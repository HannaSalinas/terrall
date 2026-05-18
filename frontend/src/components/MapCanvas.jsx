import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ColombiaMap from './ColombiaMap'

export default function MapCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[8, 12, 8]} intensity={1.5} />
        <directionalLight position={[-8, -4, -4]} intensity={0.2} color='#4488ff' />
        <ColombiaMap />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
