import shallow from "zustand/shallow"
import { useSpring, animated } from "@react-spring/three"
import { useEffect, useRef, useState } from "react"
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
  const moveTarget = useRef<Vector2>()
  const { x, z, ry } = useSpring({
    delay: crossfadeDuration * 0.5 * 1000,
    from: { x: moveFrom.x, z: moveFrom.y, ry: Math.PI / 2.0 },
    to: async (animate) => {
      if (
        moveFrom.equals(moveTo) ||
        (moveTarget.current && moveTo.equals(moveTarget.current))
      ) {
        return animate({
          to: { x: moveTo.x, z: moveTo.y },
          config: { duration: 0 },
        })
      }

      await animate({
        delay: crossfadeDuration * 0.5 * 1000,
        to: { ry: 0 },
        config: { duration: 125 },
      })

      setCharacterState(CharacterState.Running)

      await animate({
        delay: crossfadeDuration * 0.5 * 1000,
        to: { x: moveTo.x, z: moveTo.y },
        config: {
          duration: moveFrom.distanceTo(moveTo) * runSpeed,
        },
      })

      moveTarget.current = moveTo

      setCharacterState(CharacterState.Idle)
    },
  })

  /* Character logic */
  useEffect(() => {
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
  }, [moveFrom, moveTo, netcode.origin, netcode.replay])

  return (
    <animated.group position-x={x} position-z={z} rotation-y={ry}>
      {props.skin({ state: characterState })}
    </animated.group>
  )
}
