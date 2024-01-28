import { useAtom } from "jotai"
import { selectedCharacterAtom } from "../../../game/state/jotai/characters"
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

   return (
      <ActionCardList
         cards={selectedCharacterData.cards}
         onActionTriggered={onActionTriggered}
      />
   )
}

export { SelectedCharacterCards }
