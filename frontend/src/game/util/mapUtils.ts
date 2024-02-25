import { PrimitiveAtom, getDefaultStore } from "jotai"
import { ZGameEntity, ZPosition2D } from "../../../../shared/types/types"
import { allActiveGameEntitiesAtom } from "../state/jotai/entities"

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

const getEntitiesForPosition = (position: ZPosition2D) => {
   const jotaiStore = getDefaultStore()
   const allEntities = jotaiStore.get(allActiveGameEntitiesAtom)

   const tileCenter = getTilePositionFromPosition(position.x, position.z)

   const entitiesOnTile: Array<{
      entityData: ZGameEntity
      entity: PrimitiveAtom<ZGameEntity>
   }> = []

   for (const entity of allEntities) {
      const entityData: ZGameEntity = jotaiStore.get(entity)

      const differenceX = Math.abs(entityData.position!.x - tileCenter.center.x)
      const differenceZ = Math.abs(entityData.position!.z - tileCenter.center.z)

      if (differenceX <= 0.5 && differenceZ <= 0.5) {
         // TODO: Fix
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
