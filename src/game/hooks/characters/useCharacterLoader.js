import { characterLoader } from "../../loaders/characterLoader"
import { useAtom } from "jotai"
import { useEffect } from "react"

const useCharacterLoader = ({
   characterConfigFolder,
   characterCardsAtom,
   characterAtom,
}) => {
   const [cards, setCards] = useAtom(characterCardsAtom)
   const [character, setCharacter] = useAtom(characterAtom)

   useEffect(() => {
      const loadCharacter = async () => {
         const character = await characterLoader(characterConfigFolder)

         console.log("cards in usecharacterload", character.cards)
         setCards(character.cards)
         setCharacter(character)
      }
      console.log("Calling loadCharacter")
      loadCharacter()
   }, [characterConfigFolder, setCards, setCharacter])
}

export { useCharacterLoader }
