import { PrimitiveAtom, getDefaultStore } from "jotai"
import { ZGameEntity, ZPosition2D } from "../../../../shared/types/types"
import { allActiveGameEntitiesAtom } from "../state/jotai/entities"

/**
 * Returns the center position of the tile the given
 * position is on.
 
 */
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

/**
 * Return the nearest tile corner to the given position.
 * Used to position the helper grid, for example.
 */
const getNearestTileCornerFromPosition = (xPos: number, zPos: number) => {
   const x = Math.round(xPos)
   const z = Math.round(zPos)

   return {
      x: x,
      z: z,
   }
}

/**
 * Return the list of entities on the tile that corresponds
 * to the given position.
 *
 * @returns - an array of objects: {
 *   entityData: entity data
 *   entity: entity atom
 * }
 */
const getEntitiesForPosition = (position: ZPosition2D) => {
   // TODO: Make into hook.
   // by turning the point to tile coordinates first, we
   // can memo the result.
   const jotaiStore = getDefaultStore()
   const activeEntities = jotaiStore.get(allActiveGameEntitiesAtom)

   const tileCenter = getTilePositionFromPosition(position.x, position.z)

   const entitiesOnTile: Array<{
      entityData: ZGameEntity
      entity: PrimitiveAtom<ZGameEntity>
   }> = []

   for (const entity of activeEntities) {
      const entityData: ZGameEntity = jotaiStore.get(entity)

      const differenceX = Math.abs(entityData.position!.x - tileCenter.center.x)
      const differenceZ = Math.abs(entityData.position!.z - tileCenter.center.z)

      if (differenceX <= 0.5 && differenceZ <= 0.5) {
         // TODO: Fix?
         entitiesOnTile.push({
            entityData: entityData,
            entity: entity as unknown as PrimitiveAtom<ZGameEntity>,
         })
      }
   }

   return entitiesOnTile
}

export {
   getTilePositionFromPosition,
   getNearestTileCornerFromPosition,
   getEntitiesForPosition,
}
