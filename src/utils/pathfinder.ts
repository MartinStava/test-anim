import { Vector2 } from "three"

export const findPath = (from: Vector2, to: Vector2) => {
  //TODO: Replaced with an actual pathfinder

  if (from.equals(to)) {
    return { x: to.x, z: to.y }
  }

  return [new Vector2(from.x + 2, from.y + 2), to].map((elm) => ({
    x: elm.x,
    z: elm.y,
  }))
}
