import "./App.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Character, Target } from "./components/Character"
import { Gunslinger } from "./models/Gunslinger"

function App() {
  const [target, setTarget] = useState(Target.Default)
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
        position={[0, 0.5, 11]}
        onClick={() => {
          setTarget(Target.A)
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
