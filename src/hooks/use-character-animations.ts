import { useAnimations } from "@react-three/drei"
import { AnimationAction, Object3D } from "three"
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

  /* Blending */
  const previousActionRef = useRef<AnimationAction>()
  const blend = (to: AnimationAction) => {
    to.reset()
    if (previousActionRef.current) {
      to.crossFadeFrom(previousActionRef.current, crossfadeDuration, true)
    }
    to.play()
    previousActionRef.current = to
  }

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
        blend(actions.idle)
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
      //...
    }
    characterAnimations.mixer.addEventListener("finished", finished)

    return () => {
      characterAnimations.mixer.removeEventListener("finished", finished)
    }
  }, [state, characterAnimations])
}
