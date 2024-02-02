import { useAtom } from "jotai"
import { currentlySelectedActionCardAtom } from "../../../game/state/jotai/gameState"
import { activeCharacterAtom } from "../../../game/state/jotai/characters"
import { useEffect } from "react"

import { MovementActionHelper } from "./MovementActionHelper"

import { actionTypes } from "../../../config/actions/actionTypes"
import { OffensiveActionHelper } from "./OffensiveActionHelper"
import { SupportActionHelper } from "./SupportActionHelper"

const ActionHelper = () => {
   const [selectedCard] = useAtom(currentlySelectedActionCardAtom)
   const [selectedCardData] = useAtom(selectedCard)

   const [activeCharacter] = useAtom(activeCharacterAtom)
   const [activeCharacterData] = useAtom(activeCharacter)

   const action = selectedCardData.actions.find(
      (action) => action.id === selectedCardData.nextActionId
   )

   useEffect(() => {
      console.log("In ActionHelper, currently selected card:", selectedCard)
      console.log("In ActionHelper, selected card data:", selectedCardData)
      console.log("In ActionHelper, active character:", activeCharacter)
      console.log(
         "In ActionHelper, active character data:",
         activeCharacterData
      )
      console.log("In ActionHelper, next action:", action)
   }, [
      action,
      activeCharacter,
      activeCharacterData,
      selectedCard,
      selectedCardData,
   ])

   return (
      <group>
         {action?.type === actionTypes.movement && (
            <MovementActionHelper
               selectedCardAtom={selectedCard}
               activeCharacterAtom={activeCharacter}
            />
         )}
         {action?.type === actionTypes.offensive && (
            <OffensiveActionHelper
               selectedCardAtom={selectedCard}
               activeCharacterAtom={activeCharacter}
            />
         )}
         {action?.type === actionTypes.support && (
            <SupportActionHelper
               selectedCardAtom={selectedCard}
               activeCharacterAtom={activeCharacter}
            />
         )}
      </group>
   )
}

export { ActionHelper }