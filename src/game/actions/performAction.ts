import type { Atom } from "jotai"
import { getDefaultStore } from "jotai"

import { allGameEntitiesAtom } from "../state/jotai/entities"
import { actionTypes } from "../../config/actions/actionTypes"

interface point2d {
   x: number
   z: number
}

interface performActionProps {
   // TODO: Fix the type never to Atom<Character>
   selectedCharacterAtom: never
   activeCardAtom: Atom<ActionCard>
   selectedAction: ActionCardAction
   targetPoint: point2d
}

interface affectedEntity {
   entityData: GameEntity
   entity: Atom<GameEntity>
}

const performAction = ({
   selectedCharacterAtom,
   activeCardAtom,
   selectedAction,
   targetPoint,
}: performActionProps) => {
   if (selectedAction.type === actionTypes.movement) {
      return performMoveAction({
         selectedCharacterAtom,
         activeCardAtom,
         selectedAction,
         targetPoint,
      })
   }

   const tileCenter = {
      x: Math.floor(targetPoint.x) + 0.5,
      z: Math.floor(targetPoint.z) + 0.5,
   }
   const jotaiStore = getDefaultStore()
   const selectedCharacter = jotaiStore.get(selectedCharacterAtom)
   const activeCard = jotaiStore.get(activeCardAtom)

   const allGameEntities = jotaiStore.get(allGameEntitiesAtom)
   const affectedEntities: Array<affectedEntity> = []

   for (const entity of allGameEntities) {
      const entityData: GameEntity = jotaiStore.get(entity)

      const differenceX = Math.abs(entityData.position.x - tileCenter.x)
      const differenceZ = Math.abs(entityData.position.z - tileCenter.z)

      if (differenceX <= 0.5 && differenceZ <= 0.5) {
         affectedEntities.push({ entityData: entityData, entity: entity })
      }
   }

   // TODO: Do something with the affected entities
   console.log("Affected entities: ", affectedEntities)
}

const performMoveAction = (props: performActionProps) => {
   const jotaiStore = getDefaultStore()
   const selectedCharacter: Character = jotaiStore.get(
      props.selectedCharacterAtom
   )

   selectedCharacter.position.x = props.targetPoint.x
   selectedCharacter.position.z = props.targetPoint.z

   jotaiStore.set(props.selectedCharacterAtom, { ...selectedCharacter })
}

export { performAction }
