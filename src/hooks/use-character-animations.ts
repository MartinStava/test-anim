import { useAnimations } from "@react-three/drei"
import { Object3D } from "three"
import { useEffect, useRef } from "react"
import { crossfadeDuration } from "../config"

export enum CharacterState {
  Idle,
  Running,
}

// type AnimationName = "idle" | "run" | "stop_run"

export const useCharacterAnimations = (
  state: CharacterState,
  clips: THREE.AnimationClip[],
  root?: React.MutableRefObject<Object3D | undefined | null>
) => {
  const characterAnimations = useAnimations(clips, root)

  const previousAnimationNameRef = useRef<CharacterState>()

  useEffect(() => {
    const currentAction = characterAnimations.actions["idle"]
    if (!currentAction) {
      return
    }

    currentAction.reset()

    /* Crossfade from previous state */
    if (previousAnimationNameRef.current) {
      const previousAction =
        characterAnimations.actions[previousAnimationNameRef.current]

      if (previousAction) {
        currentAction.crossFadeFrom(previousAction, crossfadeDuration, true)
      }
    }

    // TODO: Implement transition from running to idle via stop_run

    currentAction.play()

    previousAnimationNameRef.current = state
  }, [state, characterAnimations.actions])
}
