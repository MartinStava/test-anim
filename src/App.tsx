import "./App.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Character } from "./components/Character"

function App() {
  const [hovered, setHover] = useState(false)

  return (
    <Canvas>
      <OrbitControls />
      <gridHelper args={[50, 50]} />
      <Stats />
      <directionalLight position={[0, 10, 10]} />
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Character id={"character1"} />
      </Suspense>
      <mesh
        position={[7.5, 0.5, 0.0]}
        onClick={() => {
          console.log("now")
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
