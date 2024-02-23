import type { PrimitiveAtom } from "jotai"
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
   selectedCharacterAtom: PrimitiveAtom<ZCharacter>
   activeCardAtom: PrimitiveAtom<ZActionCard>
   selectedAction: ZActionCardAction
}

interface AffectedEntity {
   entityData: ZGameEntity
   entity: PrimitiveAtom<ZGameEntity>
}

interface PerformEffectProps {
   selectedCharacterAtom: PrimitiveAtom<ZCharacter>
   activeEffect: ZActionEffect
   targetPoint: ZPosition2D
}

/**
 * performEffect is called for each effect in action.
 * Takes care of applying the effects.
 */
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

   const position = PositionSchema.safeParse(selectedCharacter.position)
   if (!position.success) {
      throw new Error(
         `Selected character has no position. selectedCharacter: ${selectedCharacter}`
      )
   }

   selectedCharacter.targetPosition = {
      x: props.targetPoint.x,
      z: props.targetPoint.z,
   }

   jotaiStore.set(props.selectedCharacterAtom, {
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

   /**
    * Get all entities that are in the same tile as the target point
    */
   for (const entity of allGameEntities) {
      const entityData: ZGameEntity = jotaiStore.get(entity)

      const differenceX = Math.abs(entityData.position!.x - tileCenter.x)
      const differenceZ = Math.abs(entityData.position!.z - tileCenter.z)

      if (differenceX <= 0.5 && differenceZ <= 0.5) {
         // TODO: Fix
         affectedEntities.push({
            entityData: entityData,
            entity: entity as unknown as PrimitiveAtom<ZGameEntity>,
         })
      }
   }

   const character = jotaiStore.get(props.selectedCharacterAtom)
   // TODO: Implemented differente types for different actions to validate?
   const attackPower = props.activeEffect.powerMultiplier! * character.strength

   for (const entity of affectedEntities) {
      if (entity.entityData.health && attackPower) {
         entity.entityData.health -= attackPower
      }

      jotaiStore.set(entity.entity, entity.entityData)
   }
}

/**
 * performAction is called to apply the action-wide effects of actions,
 * such as action delay and next action
 */
const performAction = ({
   selectedCharacterAtom,
   activeCardAtom,
   selectedAction,
}: PerformActionProps) => {
   const jotaiStore = getDefaultStore()
   const selectedCharacter = jotaiStore.get(selectedCharacterAtom)

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

   jotaiStore.set(activeCardAtom, card)

   jotaiStore.set(selectedCharacterAtom, { ...selectedCharacter })
}

export { performAction, performEffect }
