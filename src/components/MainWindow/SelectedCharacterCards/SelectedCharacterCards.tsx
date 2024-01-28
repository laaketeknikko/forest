import { useAtom } from "jotai"
import {
   selectedCharacterAtom,
   activeCharacterAtom,
} from "../../../game/state/jotai/characters"
import { ActionCardList } from "../../Cards/ActionCardList"

type cardTriggeredFunction = (cardId: string) => void

interface SelectedCharacterCardsProps {
   onActionTriggered: cardTriggeredFunction
}

const SelectedCharacterCards = ({
   onActionTriggered,
}: SelectedCharacterCardsProps) => {
   const [selectedCharacter] = useAtom(selectedCharacterAtom)
   const [selectedCharacterData] = useAtom(selectedCharacter)
   const [activeCharacter] = useAtom(activeCharacterAtom)
   const [activeCharacterData] = useAtom(activeCharacter)

   return (
      <ActionCardList
         cards={activeCharacterData.cards}
         onActionTriggered={onActionTriggered}
      />
   )
}

export { SelectedCharacterCards }
