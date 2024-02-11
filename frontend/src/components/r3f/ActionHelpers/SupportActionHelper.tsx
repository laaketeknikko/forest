import { Atom, useAtom } from "jotai"
import { useEffect } from "react"
import { ZActionCard, ZCharacter } from "../../../../../shared/types/types"

interface SupportActionHelperProps {
   selectedCardAtom: Atom<ZActionCard>
   activeCharacterAtom: Atom<ZCharacter>
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
