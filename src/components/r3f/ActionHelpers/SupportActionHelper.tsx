import { ScreenSpace, Text } from "@react-three/drei"
import { Atom, useAtom } from "jotai"

interface SupportActionHelperProps {
   selectedCardAtom: Atom<ActionCard>
   activeCharacterAtom: Atom<Character>
}

const SupportActionHelper = ({
   selectedCardAtom,
   activeCharacterAtom,
}: SupportActionHelperProps) => {
   const [selectedCard] = useAtom(selectedCardAtom)
   const [activeCharacter] = useAtom(activeCharacterAtom)

   const action = selectedCard.actions.find(
      (action) => action.id === selectedCard.nextActionId
   )

   return null
}
export { SupportActionHelper }
