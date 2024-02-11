import type { Atom } from "jotai"
import { getDefaultStore } from "jotai"

import { allActiveGameEntitiesAtom } from "../state/jotai/entities"
import { actionTypes } from "../../config/actions/actionTypes"
import {
   IActionCard,
   IActionCardAction,
   ICharacter,
   IGameEntity,
} from "../../../../shared/types/types"

interface point2d {
   x: number
   z: number
}

interface performActionProps {
   // TODO: Fix the type never to Atom<Character>
   selectedCharacterAtom: Atom<ICharacter>
   activeCardAtom: Atom<IActionCard>
   selectedAction: IActionCardAction
   targetPoint: point2d
}

interface affectedEntity {
   entityData: IGameEntity
   entity: Atom<IGameEntity>
}

const performAction = ({
   selectedCharacterAtom,
   activeCardAtom,
   selectedAction,
   targetPoint,
}: performActionProps) => {
   if (selectedAction.type === actionTypes.movement) {
      performMoveAction({
         selectedCharacterAtom,
         activeCardAtom,
         selectedAction,
         targetPoint,
      })
   } else if (selectedAction.type === actionTypes.offensive) {
      performOffensiveAction({
         selectedCharacterAtom,
         activeCardAtom,
         selectedAction,
         targetPoint,
      })
   }

   const jotaiStore = getDefaultStore()
   const selectedCharacter = jotaiStore.get(selectedCharacterAtom)

   // Perform updates on character

   // Update action delay
   selectedCharacter.currentActionDelay +=
      selectedCharacter.baseActionDelay * selectedAction.actionDelayMultiplier

   // Update next action
   const card = { ...jotaiStore.get(activeCardAtom) }
   const actionIndex = card.actions.findIndex(
      (action) => action._id === card.nextActionId
   )

   if (actionIndex === card.actions.length - 1) {
      card.nextActionId = card.actions[0]._id
   } else {
      card.nextActionId = card.actions[actionIndex + 1]._id
   }

   // TODO: fix
   jotaiStore.set(activeCardAtom as never, card)

   // Update character atom
   jotaiStore.set(selectedCharacterAtom as never, { ...selectedCharacter })
}

const performMoveAction = (props: performActionProps) => {
   const jotaiStore = getDefaultStore()
   const selectedCharacter: ICharacter = jotaiStore.get(
      props.selectedCharacterAtom
   )

   console.assert(
      selectedCharacter.position !== undefined,
      "Selected character has no position. selectedCharacter: ",
      selectedCharacter
   )
   selectedCharacter.position.x = props.targetPoint.x
   selectedCharacter.position.z = props.targetPoint.z

   jotaiStore.set(props.selectedCharacterAtom as never, {
      ...selectedCharacter,
   })
}

const performOffensiveAction = (props: performActionProps) => {
   const tileCenter = {
      x: Math.floor(props.targetPoint.x) + 0.5,
      z: Math.floor(props.targetPoint.z) + 0.5,
   }
   const jotaiStore = getDefaultStore()

   const allGameEntities = jotaiStore.get(allActiveGameEntitiesAtom)
   const affectedEntities: Array<affectedEntity> = []

   for (const entity of allGameEntities) {
      const entityData: IGameEntity = jotaiStore.get(entity)

      const differenceX = Math.abs(entityData.position!.x - tileCenter.x)
      const differenceZ = Math.abs(entityData.position!.z - tileCenter.z)

      if (differenceX <= 0.5 && differenceZ <= 0.5) {
         affectedEntities.push({ entityData: entityData, entity: entity })
      }
   }

   const attackPower = props.selectedAction.powerMultiplier

   for (const entity of affectedEntities) {
      if (entity.entityData.health && attackPower) {
         entity.entityData.health -= attackPower
      }
      // TODO: Fix typing
      jotaiStore.set(entity.entity as never, entity.entityData)
   }
}

export { performAction }
