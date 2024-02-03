import { useAtom } from "jotai"
import {
   selectedCharacterAtom,
   activeCharacterAtom,
} from "../../../game/state/jotai/characters"
import { ActionCardList } from "../../Cards/ActionCardList"
import type { onCardSelectedFunc } from "../../Cards/ActionCard"
import { useEffect } from "react"

interface SelectedCharacterCardsProps {
   onCardSelected?: onCardSelectedFunc
}

const SelectedCharacterCards = ({
   onCardSelected,
}: SelectedCharacterCardsProps) => {
   const [selectedCharacter] = useAtom(selectedCharacterAtom)
   const [selectedCharacterData] = useAtom(selectedCharacter)
   const [activeCharacter] = useAtom(activeCharacterAtom)
   const [activeCharacterData] = useAtom(activeCharacter)

   useEffect(() => {
      console.log(
         "In SelectedCharacterCards, selectedCharacterData",
         selectedCharacterData
      )
      console.log(
         "In selectedCharacterCards, activeCharacterData",
         activeCharacterData
      )
   }, [activeCharacterData, selectedCharacterData])

   console.log(
      "Active character cards in selectedcharactercards",
      activeCharacterData.cards
   )

   return (
      <>
         {activeCharacterData.cards.length > 0 && (
            <ActionCardList
               cards={activeCharacterData.cards}
               onCardSelected={onCardSelected}
            />
         )}
      </>
   )
}

export { SelectedCharacterCards }
