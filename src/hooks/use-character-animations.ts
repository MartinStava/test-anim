import { useAnimations } from "@react-three/drei"
import { Object3D } from "three"
import { useEffect, useRef } from "react"
import {
  crossfadeDuration,
  IdleAnimationName,
  RunAnimationName,
  StopRunAnimationName,
} from "../config"

export enum CharacterState {
  Idle = 1,
  Running = 2,
}

export const useCharacterAnimations = (
  state: CharacterState,
  clips: THREE.AnimationClip[],
  root?: React.MutableRefObject<Object3D | undefined | null>
) => {
  const characterAnimations = useAnimations(clips, root)

  /* Crossfade from previous state */
  const previousStateRef = useRef<CharacterState>()

  useEffect(() => {
    const actions = {
      idle: characterAnimations.actions[IdleAnimationName],
      run: characterAnimations.actions[RunAnimationName],
      stopRun: characterAnimations.actions[StopRunAnimationName],
    }

    if (!actions.idle || !actions.run || !actions.stopRun) {
      return
    }

    console.log("Changing character state to", state)

    switch (state) {
      case CharacterState.Idle: {
        actions.idle.reset()
        actions.idle.play()
        break
      }
      case CharacterState.Running: {
        actions.run.reset()
        actions.run.crossFadeFrom(actions.idle, crossfadeDuration, true)
        actions.run.play()
        break
      }
    }

    /* Save previous state */
    previousStateRef.current = state

    /* Setup animation mixer listeners */
    const finished = () => {
      //...
    }
    characterAnimations.mixer.addEventListener("finished", finished)

    return () => {
      characterAnimations.mixer.removeEventListener("finished", finished)
    }
  }, [state, characterAnimations])
}
