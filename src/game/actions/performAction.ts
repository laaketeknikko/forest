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
   entity: never
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
   } else if (selectedAction.type === actionTypes.offensive) {
      return performOffensiveAction({
         selectedCharacterAtom,
         activeCardAtom,
         selectedAction,
         targetPoint,
      })
   }
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

const performOffensiveAction = (props: performActionProps) => {
   const tileCenter = {
      x: Math.floor(props.targetPoint.x) + 0.5,
      z: Math.floor(props.targetPoint.z) + 0.5,
   }
   const jotaiStore = getDefaultStore()
   const selectedCharacter = jotaiStore.get(props.selectedCharacterAtom)
   const activeCard = jotaiStore.get(props.activeCardAtom)

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

   const attackPower = props.selectedAction.powerMultiplier

   for (const entity of affectedEntities) {
      if (entity.entityData.health && attackPower) {
         entity.entityData.health -= attackPower
      }
      jotaiStore.set(entity.entity, entity.entityData)
   }

   // TODO: Do something with the affected entities
   console.log("Affected entities: ", affectedEntities)
}

export { performAction }
