import { useAtom } from "jotai"
import type { Atom } from "jotai"

import ImageListItem from "@mui/material/ImageListItem"

interface Option {
   name: string
   spritePath: string
   characterAtom: Atom<Character>
}

type HandleSelectionFunc = (option: Option) => void

interface CharacterOptionProps {
   characterAtom: Atom<Character>
   handleSelection: HandleSelectionFunc
}

const CharacterOption = ({
   characterAtom,
   handleSelection,
}: CharacterOptionProps) => {
   const [characterData] = useAtom(characterAtom)

   const option = {
      name: characterData.name,
      spritePath: characterData.spritePath,
      characterAtom: characterAtom,
   }

   return (
      <ImageListItem onClick={() => handleSelection(option)}>
         <img src={characterData.spritePath} />
      </ImageListItem>
   )
}

export { CharacterOption }
