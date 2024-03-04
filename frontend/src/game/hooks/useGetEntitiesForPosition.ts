import { useCallback, useRef } from "react"
import {
   getEntitiesForPosition,
   getTilePositionFromPosition,
} from "../util/mapUtils"
import { ZPosition2D } from "../../../../shared/types/types"

const useGetEntitiesForPosition = () => {
   const tileRef = useRef(getTilePositionFromPosition(0, 0))
   const resultRef = useRef<ReturnType<typeof getEntitiesForPosition> | null>(
      null
   )

   const getEntities = useCallback((position: ZPosition2D) => {
      const tile = getTilePositionFromPosition(position.x, position.z)
      if (
         tile.center.x !== tileRef.current.center.x ||
         tile.center.z !== tileRef.current.center.z
      ) {
         tileRef.current = tile
         resultRef.current = getEntitiesForPosition(position)
      }

      return resultRef.current
   }, [])

   return {
      getEntities,
   }
}

export { useGetEntitiesForPosition }
