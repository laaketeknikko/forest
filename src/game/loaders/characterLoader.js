import { characterConfigRoot } from "../../config/paths"
import { getNextId } from "../util/idGenerator"
import clone from "clone"

const characterLoader = async (characterConfigFolder) => {
   const characterConfig = (
      await import(
         `${characterConfigRoot}/${characterConfigFolder}/characterconfig`
      )
   ).characterConfig

   console.log("In characterLoader, config: ", characterConfig)

   // Because character configs are JS objects, we want to
   // clone them. Second argument false breaks
   // circular references and shallow references to same
   // objects, for example in case of the same action
   // being in different cards.
   const character = clone(characterConfig, false)

   // Generate ids for character, cards and actions.
   character.id = getNextId()

   character.cards.map((card) => {
      card.id = getNextId()

      card.actions = card.actions.map((action) => {
         action.id = getNextId()
         return action
      })

      card.nextActionId = card.actions[0].id

      return card
   })

   console.log("Character in loader", character)

   return character
}

export { characterLoader }
