import shallow from "zustand/shallow"
import { useSpring, animated } from "@react-spring/three"
import { useEffect, useState } from "react"
import { Vector2 } from "three"
import { runSpeed } from "../config"
import { CharacterState } from "../hooks/use-character-animations"
import { useGameStore } from "../stores/game"
import { CharacterSkin } from "./Skins/CharacterSkin"

export const Character: React.FC<{
  characterId: string
  skin: CharacterSkin
}> = (props) => {
  /* Netcode state */
  const netcode = useGameStore(
    (state) => ({
      origin: state.origin.find((x) => x.characterId === props.characterId),
      replay: state.replay.find((x) => x.characterId === props.characterId),
    }),
    shallow
  )

  /* Inner state */
  const [moveFrom] = useState(netcode.origin?.position ?? new Vector2())
  const [moveTo] = useState(netcode.origin?.position ?? new Vector2())
  const [characterState, setCharacterState] = useState(CharacterState.Idle)

  /* Character logic */
  useEffect(() => {
    setCharacterState(CharacterState.Idle)
  }, [])

  /* Procedural movement */
  const { x, z } = useSpring({
    from: { x: moveFrom.x, z: moveFrom.y },
    to: { x: moveTo.x, z: moveTo.y },
    config: {
      duration: moveFrom.distanceTo(moveTo) * runSpeed,
    },
  })

  return (
    <animated.group position-x={x} position-z={z}>
      {props.skin({ state: characterState })}
    </animated.group>
  )
}
