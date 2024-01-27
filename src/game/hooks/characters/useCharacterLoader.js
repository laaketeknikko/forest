import { characterLoader } from "../../loaders/characterLoader"
import { useAtom } from "jotai"
import { useEffect } from "react"

const useCharacterLoader = ({
   characterConfigFolder,
   characterCardsAtom,
   characterAtom,
}) => {
   const [, setCards] = useAtom(characterCardsAtom)
   const [, setCharacter] = useAtom(characterAtom)

   useEffect(() => {
      const loadCharacter = async () => {
         const character = await characterLoader(characterConfigFolder)

         setCards(character.cards)
         setCharacter(character)
      }
      loadCharacter()
   }, [characterConfigFolder, setCards, setCharacter])
}

export { useCharacterLoader }
