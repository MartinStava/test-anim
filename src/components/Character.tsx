import shallow from "zustand/shallow"
import { useSpring, animated } from "@react-spring/three"
import { useEffect, useState } from "react"
import { Vector2 } from "three"
import { crossfadeDuration, runSpeed } from "../config"
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
  const [characterState, setCharacterState] = useState(CharacterState.Idle)

  /* Root motion */
  const [rested, setRested] = useState(false)
  const { x, z } = useSpring({
    delay: crossfadeDuration * 0.5 * 1000,
    from: { x: moveFrom.x, z: moveFrom.y },
    to: { x: moveTo.x, z: moveTo.y },
    config: {
      duration: moveFrom.distanceTo(moveTo) * runSpeed,
    },
    onRest() {
      setRested(true)
    },
  })

  /* Character logic */
  useEffect(() => {
    /* Procedural movement */

    // Update moveFrom if changed
    const originPosition = netcode.origin?.position ?? new Vector2()
    if (!moveFrom.equals(originPosition)) {
      setMoveFrom(originPosition)
    }

    // Update moveTo if changed
    const replayPosition = netcode.replay?.position ?? originPosition
    if (!moveTo.equals(replayPosition)) {
      setMoveTo(replayPosition)
    }

    // Switch character state
    const newState =
      originPosition.equals(replayPosition) || rested
        ? CharacterState.Idle
        : CharacterState.Running
    if (newState !== characterState) {
      setCharacterState(newState)
    }
  }, [characterState, moveFrom, moveTo, netcode.origin, netcode.replay, rested])

  return (
    <animated.group position-x={x} position-z={z}>
      {props.skin({ state: characterState })}
    </animated.group>
  )
}
