import { useAtom } from "jotai"
import { activeCharacterAtomAtom } from "../../../game/state/jotai/characters"
import { ActionCardList } from "../../Cards/ActionCardList"
import type { onCardSelectedFunc } from "../../Cards/ActionCard"

interface SelectedCharacterCardsProps {
   onCardSelected?: onCardSelectedFunc
}

/**
 * Wrapper to display list of action cards for selected character.
 
 */
const SelectedCharacterCards = ({
   onCardSelected,
}: SelectedCharacterCardsProps) => {
   const [activeCharacter] = useAtom(activeCharacterAtomAtom)
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
