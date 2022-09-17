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
  const [moveFrom, setMoveFrom] = useState(new Vector2())
  const [moveTo, setMoveTo] = useState(new Vector2())
  const [characterState] = useState(CharacterState.Idle)

  /* Character logic */
  console.log("render")
  useEffect(() => {
    /* Procedural movement */

    // Update moveFrom if changed
    const originFrom = netcode.origin?.position ?? new Vector2()
    if (!moveFrom.equals(originFrom)) {
      console.log("set move from")
      setMoveFrom(originFrom)
      setMoveTo(originFrom)
    }

    //...
  }, [moveFrom, netcode.origin])

  /* Root motion */
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
