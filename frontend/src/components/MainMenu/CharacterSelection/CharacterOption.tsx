import { useAtom } from "jotai"
import type { Atom } from "jotai"

import ImageListItem from "@mui/material/ImageListItem"
import { ICharacter } from "../../../../../shared/types/types"

interface Option {
   name: string
   spritePath: string
   characterAtom: Atom<ICharacter>
}

type HandleSelectionFunc = (option: Option) => void

interface CharacterOptionProps {
   characterAtom: Atom<ICharacter>
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
