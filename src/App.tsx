import "./App.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Character, State } from "./components/Character"

function App() {
  const [target, setTarget] = useState(State.Default)

  const [hovered, setHover] = useState(false)

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
        position={[7.5, 0.5, 0.0]}
        onClick={() => {
          setTarget(State.Start)
        }}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color={hovered ? "hotpink" : "grey"} />
      </mesh>
    </Canvas>
  )
}

export default App
