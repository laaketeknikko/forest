import type { Atom } from "jotai"
import { getDefaultStore } from "jotai"

import { allActiveGameEntitiesAtom } from "../state/jotai/entities"
import { actionTypes } from "../../config/actions/actionTypes"
import {
   ZActionCard,
   ZActionCardAction,
   ZActionEffect,
   ZCharacter,
   ZGameEntity,
   ZPosition2D,
} from "../../../../shared/types/types"
import { PositionSchema } from "../../../../shared/zod/schemas"

interface PerformActionProps {
   // TODO: Fix the type never to Atom<Character>
   selectedCharacterAtom: Atom<ZCharacter>
   activeCardAtom: Atom<ZActionCard>
   selectedAction: ZActionCardAction
}

interface AffectedEntity {
   entityData: ZGameEntity
   entity: Atom<ZGameEntity>
}

interface PerformEffectProps {
   // TODO: Fix the type never to Atom<Character>
   selectedCharacterAtom: Atom<ZCharacter>
   activeEffect: ZActionEffect
   targetPoint: ZPosition2D
}

const performEffect = ({
   selectedCharacterAtom,
   activeEffect,
   targetPoint,
}: PerformEffectProps) => {
   if (activeEffect.type === actionTypes.movement) {
      performMoveEffect({
         selectedCharacterAtom,
         activeEffect,

         targetPoint,
      })
   } else if (activeEffect.type === actionTypes.offensive) {
      performOffensiveEffect({
         selectedCharacterAtom,
         activeEffect,

         targetPoint,
      })
   }
}

const performMoveEffect = (props: PerformEffectProps) => {
   const jotaiStore = getDefaultStore()
   const selectedCharacter: ZCharacter = jotaiStore.get(
      props.selectedCharacterAtom
   )
   // TODO: Is this the right way? What if character actually has no position?
   const position = PositionSchema.safeParse(selectedCharacter.position)
   if (!position.success) {
      throw new Error(
         `Selected character has no position. selectedCharacter: ${selectedCharacter}`
      )
   }

   selectedCharacter.position.x = props.targetPoint.x
   selectedCharacter.position.z = props.targetPoint.z

   // TODO: Fix
   jotaiStore.set(props.selectedCharacterAtom as never, {
      ...selectedCharacter,
   })
}

const performOffensiveEffect = (props: PerformEffectProps) => {
   const tileCenter = {
      x: Math.floor(props.targetPoint.x) + 0.5,
      z: Math.floor(props.targetPoint.z) + 0.5,
   }
   const jotaiStore = getDefaultStore()

   const allGameEntities = jotaiStore.get(allActiveGameEntitiesAtom)
   const affectedEntities: Array<AffectedEntity> = []

   for (const entity of allGameEntities) {
      const entityData: ZGameEntity = jotaiStore.get(entity)

      const differenceX = Math.abs(entityData.position!.x - tileCenter.x)
      const differenceZ = Math.abs(entityData.position!.z - tileCenter.z)

      if (differenceX <= 0.5 && differenceZ <= 0.5) {
         affectedEntities.push({ entityData: entityData, entity: entity })
      }
   }

   const character = jotaiStore.get(props.selectedCharacterAtom)
   // TODO: Implemented differente types for different actions to validate?
   const attackPower = props.activeEffect.powerMultiplier! * character.strength

   for (const entity of affectedEntities) {
      if (entity.entityData.health && attackPower) {
         entity.entityData.health -= attackPower
      }
      // TODO: Fix typing
      jotaiStore.set(entity.entity as never, entity.entityData)
   }
}

// TODO: Unify performing actions.
const performAction = ({
   selectedCharacterAtom,
   activeCardAtom,
   selectedAction,
}: PerformActionProps) => {
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

export { performAction, performEffect }
