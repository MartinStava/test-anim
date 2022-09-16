/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useSpring, animated } from "@react-spring/three"
import { useEffect, useState } from "react"
import { Vector2 } from "three"
import { runSpeed } from "../config"
import { CharacterState } from "../hooks/use-character-state"
import { useGameStore } from "../stores/game"
import { Gunslinger } from "./Gunslinger"

export const Character: React.FC<{
  characterId: string
  children: React.ReactNode
}> = (props) => {
  const originState = useGameStore((state) =>
    state.origin.find((x) => x.characterId === props.characterId)
  )

  const replayState = useGameStore((state) =>
    state.replay.find((x) => x.characterId === props.characterId)
  )

  const [origin] = useState<Vector2>(originState?.position ?? new Vector2())

  const [destination, setDestination] = useState<Vector2>(origin)

  const [animation, setAnimation] = useState<CharacterState>("idle")

  useEffect(() => {
    if (!replayState) {
      return
    }
    setDestination(replayState.position)
  }, [replayState])

  const { x, z } = useSpring({
    from: { x: origin.x, z: origin.y },
    to: { x: destination.x, z: destination.y },
    config: {
      duration: origin.distanceTo(destination) * runSpeed,
    },
    onStart() {
      setAnimation("run")
    },
  })

  return (
    <animated.group position-x={x} position-z={z}>
      <Gunslinger state={animation} />
    </animated.group>
  )
}
