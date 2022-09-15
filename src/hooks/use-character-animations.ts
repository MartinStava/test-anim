import { useAnimations, useGLTF } from "@react-three/drei"
import { Object3D } from "three"
import { useEffect } from "react"

export type CharacterAnimationName = "idle" | "run" | "stop"

const getPath = (
  characterName: string,
  animationName: CharacterAnimationName
) => {
  return `/gltf/${characterName}/a_${animationName}.glb`
}

export const useCharacterAnimations = (
  characterName: string,
  animationName: CharacterAnimationName,
  root?: React.MutableRefObject<Object3D | undefined | null>
) => {
  // Idle
  const idleGltf = useGLTF(getPath(characterName, "idle"))
  const idleAnimation = useAnimations(idleGltf.animations, root)

  // Run
  const runGltf = useGLTF(getPath(characterName, "run"))
  const runAnimation = useAnimations(runGltf.animations, root)

  // Stop
  const stopGltf = useGLTF(getPath(characterName, "stop"))
  const stopAnimation = useAnimations(stopGltf.animations, root)

  useEffect(() => {
    const idleAction = idleAnimation.actions[idleAnimation.names[0]]
    const runAction = runAnimation.actions[runAnimation.names[0]]
    const stopAction = stopAnimation.actions[stopAnimation.names[0]]

    if (!idleAction || !runAction || !stopAction) {
      return
    }

    const currentAction =
      animationName === "idle"
        ? idleAction
        : animationName === "run"
        ? runAction
        : stopAction

    currentAction.reset()
    currentAction.reset()
    currentAction.play()
  }, [characterName, animationName])
}
