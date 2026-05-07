import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#1a6b3c" wireframe />
    </mesh>
  )
}

function MapCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default MapCanvas
