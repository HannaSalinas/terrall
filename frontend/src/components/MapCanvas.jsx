import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ColombiaMap from './ColombiaMap'

export default function MapCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -5, -5]} intensity={0.3} />
      <ColombiaMap />
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  )
}
