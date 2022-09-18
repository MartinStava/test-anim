import { useAnimations } from "@react-three/drei"
import { AnimationAction, LoopOnce, Object3D } from "three"
import { useEffect, useRef } from "react"
import {
  crossfadeDuration,
  IdleAnimationName,
  RunAnimationName,
  StopRunAnimationName,
} from "../config"

export enum CharacterState {
  Idle = "Idle",
  Running = "Running",
}

export const useCharacterAnimations = (
  state: CharacterState,
  clips: THREE.AnimationClip[],
  root?: React.MutableRefObject<Object3D | undefined | null>
) => {
  const characterAnimations = useAnimations(clips, root)

  const previousStateRef = useRef<CharacterState>()

  const previousActionRef = useRef<AnimationAction>()

  useEffect(() => {
    const actions = {
      idle: characterAnimations.actions[IdleAnimationName]!,
      run: characterAnimations.actions[RunAnimationName]!,
      stopRun: characterAnimations.actions[StopRunAnimationName]!,
    }

    const blend = (to: AnimationAction) => {
      to.reset()
      if (to === actions.stopRun) {
        to.setLoop(LoopOnce, 1)
        to.clampWhenFinished = true
      }
      if (previousActionRef.current) {
        to.crossFadeFrom(previousActionRef.current, crossfadeDuration, true)
      }
      to.play()
      previousActionRef.current = to
    }

    switch (state) {
      case CharacterState.Idle: {
        if (previousStateRef.current === CharacterState.Running) {
          blend(actions.stopRun)
        } else {
          blend(actions.idle)
        }
        break
      }
      case CharacterState.Running: {
        blend(actions.run)
        break
      }
    }

    /* Save previous state */
    previousStateRef.current = state

    /* Setup animation mixer listeners */
    const finished = () => {
      blend(actions.idle)
    }
    characterAnimations.mixer.addEventListener("finished", finished)

    return () => {
      characterAnimations.mixer.removeEventListener("finished", finished)
    }
  }, [state, characterAnimations])
}
