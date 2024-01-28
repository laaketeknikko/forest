import { useAtom } from "jotai"
import { currentlySelectedActionCardAtom } from "../../game/state/jotai/gameState"
import { useEffect } from "react"

const ActionHelper = () => {
   const [selectedCard] = useAtom(currentlySelectedActionCardAtom)
   const [selectedCardData] = useAtom(selectedCard)

   useEffect(() => {
      console.log("In ActionHelper, currently selected card:", selectedCard)
      console.log("In ActionHelper, selected card data:", selectedCardData)
   }, [selectedCard, selectedCardData])

   return null
}

export { ActionHelper }
