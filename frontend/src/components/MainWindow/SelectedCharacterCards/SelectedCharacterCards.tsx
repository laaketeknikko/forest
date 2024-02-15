import { useAtom } from "jotai"
import { activeCharacterAtom } from "../../../game/state/jotai/characters"
import { ActionCardList } from "../../Cards/ActionCardList"
import type { onCardSelectedFunc } from "../../Cards/ActionCard"

interface SelectedCharacterCardsProps {
   onCardSelected?: onCardSelectedFunc
}

const SelectedCharacterCards = ({
   onCardSelected,
}: SelectedCharacterCardsProps) => {
   const [activeCharacter] = useAtom(activeCharacterAtom)
   const [activeCharacterData] = useAtom(activeCharacter)

   return (
      <>
         {activeCharacterData.cards.length > 0 && (
            <ActionCardList
               cards={activeCharacterData.cards}
               character={activeCharacterData}
               onCardSelected={onCardSelected}
            />
         )}
      </>
   )
}

export { SelectedCharacterCards }
