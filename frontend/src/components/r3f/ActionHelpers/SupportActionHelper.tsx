import { Atom, useAtom } from "jotai"
import { useEffect } from "react"

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
      (action) => action._id === selectedCard.nextActionId
   )

   useEffect(() => {
      console.log("In SupportActionHelper, activeCharacter:", activeCharacter)
      console.log("In SupportActionHelper, action:", action)
   }, [action, activeCharacter])

   return null
}
export { SupportActionHelper }
