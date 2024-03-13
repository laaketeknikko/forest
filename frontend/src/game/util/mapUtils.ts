import { PrimitiveAtom, getDefaultStore } from "jotai"
import { ZGameEntity, ZPosition2D } from "../../../../shared/types/types"
import { allActiveGameEntitiesAtom } from "../state/jotai/entities"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"
import { globalThreeStateGetterAtom } from "../state/jotai/gameState"
import { Vector3 } from "three"

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
         entitiesOnTile.push({
            entityData: entityData,
            entity: entity as unknown as PrimitiveAtom<ZGameEntity>,
         })
      }
   }

   return entitiesOnTile
}

/**
 * Returns true if the given position is inside the bounds
 * of the arena.
 *
 * Uses selectedSce
 */
const isInsideArena = (position: ZPosition2D) => {
   const jotaiStore = getDefaultStore()
   const scenario = jotaiStore.get(selectedScenarioConfigAtom)

   if (
      position.x < 0 ||
      position.z < 0 ||
      position.x > scenario.arena.size.width ||
      position.z > scenario.arena.size.length
   ) {
      return false
   } else {
      return true
   }
}

/**
 * Checks if abs of two numbers is less than precision.
 */
const approximatelyEqual = (
   number1: number,
   number2: number,
   precision: number
) => {
   return Math.abs(number1 - number2) < precision
}

const getPixelCoordinatesFromNormalizedCoordinates = (
   vector3: Vector3
): Vector3 | null => {
   const jotaiStore = getDefaultStore()
   const globalThreeStateGetter = jotaiStore.get(globalThreeStateGetterAtom)
   if (!globalThreeStateGetter || !globalThreeStateGetter.get) return null

   const size = globalThreeStateGetter.get()?.size
   if (!size) return null

   const vector = new Vector3()

   vector.x = ((vector3.x + 1) * size.width) / 2
   vector.y = (-(vector3.y - 1) * size.height) / 2
   vector.z = 0

   return vector
}

const getScreenCoordinates = (vector3: Vector3): Vector3 | null => {
   const jotaiStore = getDefaultStore()
   const globalThreeStateGetter = jotaiStore.get(globalThreeStateGetterAtom)

   if (!globalThreeStateGetter || !globalThreeStateGetter.get) return null

   const camera = globalThreeStateGetter.get()?.camera
   if (!camera) return null

   const screenCoords = new Vector3(vector3.x, vector3.y, vector3.z).project(
      camera
   )

   return screenCoords
}

const getEntityScreenCoordinates = (
   entity: ZGameEntity | PrimitiveAtom<ZGameEntity>
): Vector3 | null => {
   let position
   if ("position" in entity) {
      position = entity.position
   } else {
      const jotaiStore = getDefaultStore()
      const entityData = jotaiStore.get(entity)
      position = entityData.position
   }

   const entityCoordinates = new Vector3(position.x, position.y, position.z)
   return getScreenCoordinates(entityCoordinates)
}

export {
   getTilePositionFromPosition,
   getNearestTileCornerFromPosition,
   getEntitiesForPosition,
   approximatelyEqual,
   isInsideArena,
   getPixelCoordinatesFromNormalizedCoordinates,
   getEntityScreenCoordinates,
   getScreenCoordinates,
}
