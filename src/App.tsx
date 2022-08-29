import "./App.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Character, Target } from "./components/Character"

function App() {
  const [target, setTarget] = useState(Target.Default)
  const [hoveredA, setHoverA] = useState(false)
  const [hoveredB, setHoverB] = useState(false)
  const [hoveredC, setHoverC] = useState(false)
  const [hoveredD, setHoverD] = useState(false)

  return (
    <Canvas>
      <OrbitControls />
      <gridHelper args={[100, 100]} />
      <Stats />
      <directionalLight position={[0, 10, 10]} />
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Character target={target} />
      </Suspense>

      <mesh
        position={[7.5, 0.5, 7.5]}
        onClick={() => {
          setTarget(Target.A)
        }}
        onPointerOver={(event) => setHoverA(true)}
        onPointerOut={(event) => setHoverA(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color={hoveredA ? "hotpink" : "grey"} />
      </mesh>

      <mesh
        position={[7.5, 0.5, 0.0]}
        onClick={() => {
          setTarget(Target.B)
        }}
        onPointerOver={(event) => setHoverB(true)}
        onPointerOut={(event) => setHoverB(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color={hoveredB ? "hotpink" : "grey"} />
      </mesh>

      <mesh
        position={[7.5, 0.5, -7.5]}
        onClick={() => {
          setTarget(Target.C)
        }}
        onPointerOver={(event) => setHoverC(true)}
        onPointerOut={(event) => setHoverC(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color={hoveredC ? "hotpink" : "grey"} />
      </mesh>

      <mesh
        position={[0.0, 0.5, -7.5]}
        onClick={() => {
          setTarget(Target.D)
        }}
        onPointerOver={(event) => setHoverD(true)}
        onPointerOut={(event) => setHoverD(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color={hoveredD ? "hotpink" : "grey"} />
      </mesh>
    </Canvas>
  )
}

export default App
