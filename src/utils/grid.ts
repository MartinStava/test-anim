export const distance = (
  fromX: number,
  fromZ: number,
  toX: number,
  toZ: number
) => {
  const deltaX = toX - fromX
  const deltaZ = toZ - fromZ

  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaZ, 2))
}
