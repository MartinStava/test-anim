import "./App.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Character } from "./components/Character"
import { useGameStore } from "./store/store"
import { CompoWorker } from "./components/CompoWorker"
import { firstCharacterId, secondCharacterId } from "./config"
import { Gunslinger } from "./components/Gunslinger"

function App() {
  const [hovered, setHover] = useState(false)

  const next = useGameStore((state) => state.next)

  return (
    <Canvas>
      <OrbitControls />
      <gridHelper args={[50, 50]} />
      <Stats />
      <directionalLight position={[0, 10, 10]} />
      <ambientLight intensity={0.25} />

      {/* Characters */}
      <Suspense fallback={null}>
        <Character characterId={firstCharacterId}>
          <Gunslinger state={"idle"} />
        </Character>
        <Character characterId={secondCharacterId}>
          <CompoWorker state={"idle"} />
        </Character>
      </Suspense>

      <mesh
        position={[7.5, 0.5, 0.0]}
        onClick={next}
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
