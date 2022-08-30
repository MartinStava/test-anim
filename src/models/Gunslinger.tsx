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
  Run,
  Slide,
  CrouchIdle,
}

export const Gunslinger: React.FC<{ animation: GunslingerAnimation }> = (
  props
) => {
  const group = useRef<THREE.Group>(null)

  const { nodes } = useGLTF("/gltf/m_gunslinger.glb") as GLTFResult

  // Idle
  const idleGltf = useGLTF("/gltf/a_gunslinger_idle.glb")
  const idleAnimation = useAnimations(idleGltf.animations, group)

  // Run
  const runGltf = useGLTF("/gltf/a_gunslinger_run.glb")
  const runAnimation = useAnimations(runGltf.animations, group)

  // Slide
  const slideGltf = useGLTF("/gltf/a_gunslinger_slide.glb")
  const slideAnimation = useAnimations(slideGltf.animations, group)

  // Crouch Idle
  const crouchIdleGltf = useGLTF("/gltf/a_gunslinger_crouch_idle.glb")
  const crouchIdleAnimation = useAnimations(crouchIdleGltf.animations, group)

  const [prevAnimation, setPrevAnimation] = useState(GunslingerAnimation.None)

  useEffect(() => {
    const idleAction = idleAnimation.actions[idleAnimation.names[0]]
    const runAction = runAnimation.actions[runAnimation.names[0]]
    const slideAction = slideAnimation.actions[slideAnimation.names[0]]
    const crouchIdleAction =
      crouchIdleAnimation.actions[crouchIdleAnimation.names[0]]

    if (!idleAction || !runAction || !slideAction || !crouchIdleAction) {
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
        : prevAnimation === GunslingerAnimation.Slide
        ? slideAction
        : prevAnimation === GunslingerAnimation.CrouchIdle
        ? crouchIdleAction
        : runAction

    const currentAction =
      props.animation === GunslingerAnimation.Idle
        ? idleAction
        : props.animation === GunslingerAnimation.Slide
        ? slideAction
        : props.animation === GunslingerAnimation.CrouchIdle
        ? crouchIdleAction
        : runAction

    currentAction.reset()
    if (prevAction) {
      currentAction.crossFadeFrom(prevAction, 0.125, true)
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
