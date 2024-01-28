import { useAtom } from "jotai"
import {
   selectedCharacterAtom,
   activeCharacterAtom,
} from "../../../game/state/jotai/characters"
import { ActionCardList } from "../../Cards/ActionCardList"
import type { onCardSelectedFunc } from "../../Cards/ActionCard"

interface SelectedCharacterCardsProps {
   onCardSelected: onCardSelectedFunc
}

const SelectedCharacterCards = ({
   onCardSelected,
}: SelectedCharacterCardsProps) => {
   const [selectedCharacter] = useAtom(selectedCharacterAtom)
   const [selectedCharacterData] = useAtom(selectedCharacter)
   const [activeCharacter] = useAtom(activeCharacterAtom)
   const [activeCharacterData] = useAtom(activeCharacter)

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
