import shallow from "zustand/shallow"
import { useSpring, animated } from "@react-spring/three"
import { useEffect, useState } from "react"
import { Vector2 } from "three"
import { crossfadeDuration, runSpeed } from "../config"
import { CharacterState } from "../hooks/use-character-animations"
import { useGameStore } from "../stores/game"
import { CharacterSkin } from "./Skins/CharacterSkin"
import { delay } from "../utils/timers"

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
  const [finished, setFinished] = useState(false)
  const { x, z } = useSpring({
    delay: crossfadeDuration * 0.5 * 1000,
    from: { x: moveFrom.x, z: moveFrom.y },
    to: async (animate) => {
      if (moveFrom.equals(moveTo)) {
        return animate({
          to: { x: moveTo.x, z: moveTo.y },
          config: {
            duration: 0,
          },
        })
      }
      if (finished) {
        return
      }

      setCharacterState(CharacterState.Running)

      await delay(crossfadeDuration * 0.5 * 1000)

      // TODO: Replace with pathfinder
      await animate({
        to: { x: moveTo.x, z: moveTo.y },
        config: {
          duration: moveFrom.distanceTo(moveTo) * runSpeed,
        },
      })

      setCharacterState(CharacterState.Idle)

      setFinished(true)
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
  }, [moveFrom, moveTo, netcode.origin, netcode.replay])

  return (
    <animated.group position-x={x} position-z={z}>
      {props.skin({ state: characterState })}
    </animated.group>
  )
}
