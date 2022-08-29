/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { LoopOnce } from "three"

type GLTFResult = GLTF & {
  nodes: {
    gunslinger: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {}
}

export enum GunslingerAnimation {
  None,
  Idle,
  TurnLeft,
  TurnRight,
  Run,
  Stop,
}

export const Gunslinger: React.FC<{ animation: GunslingerAnimation }> = (
  props
) => {
  const group = useRef<THREE.Group>(null)

  const { nodes } = useGLTF("/gltf/m_gunslinger.glb") as GLTFResult

  // Idle
  const idleGltf = useGLTF("/gltf/a_gunslinger_idle.glb")
  const idleAnimation = useAnimations(idleGltf.animations, group)

  // Turn Left
  const turnLeftGltf = useGLTF("/gltf/a_gunslinger_turn_left.glb")
  const turnLeftAnimation = useAnimations(turnLeftGltf.animations, group)

  // Turn Right
  const turnRightGltf = useGLTF("/gltf/a_gunslinger_turn_right.glb")
  const turnRightAnimation = useAnimations(turnRightGltf.animations, group)

  // Run
  const runGltf = useGLTF("/gltf/a_gunslinger_run.glb")
  const runAnimation = useAnimations(runGltf.animations, group)

  // Stop
  const stopGltf = useGLTF("/gltf/a_gunslinger_run_stop.glb")
  const stopAnimation = useAnimations(stopGltf.animations, group)

  const [prevAnimation, setPrevAnimation] = useState(GunslingerAnimation.None)

  useEffect(() => {
    const idleAction = idleAnimation.actions[idleAnimation.names[0]]
    const runAction = runAnimation.actions[runAnimation.names[0]]
    const turnLeftAction = turnLeftAnimation.actions[runAnimation.names[0]]
    const turnRightAction = turnRightAnimation.actions[runAnimation.names[0]]
    const stopAction = stopAnimation.actions[stopAnimation.names[0]]

    if (
      !idleAction ||
      !runAction ||
      !stopAction ||
      !turnLeftAction ||
      !turnRightAction
    ) {
      return
    }

    if (
      props.animation === prevAnimation ||
      props.animation === GunslingerAnimation.None
    ) {
      return
    }

    const prevAction =
      prevAnimation === GunslingerAnimation.None
        ? null
        : prevAnimation === GunslingerAnimation.Idle
        ? idleAction
        : prevAnimation === GunslingerAnimation.Run
        ? runAction
        : prevAnimation === GunslingerAnimation.TurnLeft
        ? turnLeftAction
        : prevAnimation === GunslingerAnimation.TurnRight
        ? turnRightAction
        : stopAction

    const currentAction =
      props.animation === GunslingerAnimation.Idle
        ? idleAction
        : props.animation === GunslingerAnimation.Run
        ? runAction
        : props.animation === GunslingerAnimation.TurnLeft
        ? turnLeftAction
        : props.animation === GunslingerAnimation.TurnRight
        ? turnRightAction
        : stopAction

    currentAction.reset()
    if (prevAction) {
      currentAction.crossFadeFrom(prevAction, 0.125, true)
    }
    if (currentAction === stopAction) {
      currentAction.setLoop(LoopOnce, 1)
      currentAction.clampWhenFinished = true
    }
    if (currentAction === turnLeftAction) {
      // currentAction.timeScale = 2.0
      currentAction.timeScale = 3.0 // 90 & 225
    }

    currentAction.play()

    setPrevAnimation(props.animation)
  }, [props.animation, prevAnimation])

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="gunslinger"
            geometry={nodes.gunslinger.geometry}
            material={nodes.gunslinger.material}
            skeleton={nodes.gunslinger.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/gltf/m_gunslinger.glb")
