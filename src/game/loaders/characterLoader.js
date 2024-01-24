import { characterConfigRoot } from "../../config/paths"
import { getNextId } from "../util/idGenerator"

const characterLoader = async (characterConfigFolder) => {
   const character = (
      await import(
         `${characterConfigRoot}/${characterConfigFolder}/characterconfig.js`
      )
   ).characterConfig

   // Generate ids for character, cards and actions.
   character.id = getNextId()

   character.cards.map((card) => {
      card.id = getNextId()

      card.actions.map((action) => {
         action.id = getNextId()
         return action
      })

      card.nextActionId = card.actions[0].id

      return card
   })

   console.log("piglet in loader", character)

   return character
}

export { characterLoader }
