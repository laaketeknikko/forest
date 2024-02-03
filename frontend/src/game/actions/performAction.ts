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
   selectedCharacterAtom: Atom<Character>
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
   const card = jotaiStore.get(activeCardAtom)
   const actionIndex = card.actions.findIndex(
      (action) => action.id === card.nextActionId
   )
   const newCards = [...selectedCharacter.cards]
   const cardIndex = newCards.findIndex((c) => c.id === card.id)

   // Actions cycle to start of card
   if (actionIndex === card.actions.length - 1) {
      newCards[cardIndex].nextActionId = card.actions[0].id
   } else {
      newCards[cardIndex].nextActionId = card.actions[actionIndex + 1].id
   }
   selectedCharacter.cards = newCards

   // Update character atom
   jotaiStore.set(selectedCharacterAtom as never, { ...selectedCharacter })
}

const performMoveAction = (props: performActionProps) => {
   const jotaiStore = getDefaultStore()
   const selectedCharacter: Character = jotaiStore.get(
      props.selectedCharacterAtom
   )

   console.assert(
      selectedCharacter.position !== undefined,
      "Selected character has no position"
   )
   selectedCharacter.position!.x = props.targetPoint.x
   selectedCharacter.position!.z = props.targetPoint.z

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

   const allGameEntities = jotaiStore.get(allGameEntitiesAtom)
   const affectedEntities: Array<affectedEntity> = []

   for (const entity of allGameEntities) {
      const entityData: GameEntity = jotaiStore.get(entity)

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
