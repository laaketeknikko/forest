const getTilePositionFromPosition = (xPos: number, zPos: number) => {
   const x = Math.floor(xPos)
   const z = Math.floor(zPos)

   return {
      center: {
         x: x + 0.5,
         z: z + 0.5,
      },
   }
}

const getNearestTileCornerFromPosition = (xPos: number, zPos: number) => {
   console.log("getting nearest tile corner from position: ", xPos, zPos)

   const x = Math.round(xPos)
   const z = Math.round(zPos)

   console.log("nearest corner: ", x, z)

   return {
      x: x,
      z: z,
   }
}

export { getTilePositionFromPosition, getNearestTileCornerFromPosition }
